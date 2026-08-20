/**
 * Whitelist sanitiser for the legal pages' rich text.
 *
 * That field is the one place the CMS stores HTML, and it is rendered with
 * dangerouslySetInnerHTML. The editor only ever produces the tags below, but
 * the value reaches the page through the database, so it is filtered here
 * rather than trusted — anything else is stripped to its text content.
 *
 * Deliberately small: no dependency, and the allowed set matches exactly what
 * the toolbar can create.
 */

const ALLOWED_TAGS = new Set([
  'p',
  'br',
  'b',
  'strong',
  'i',
  'em',
  'u',
  'ul',
  'ol',
  'li',
  'a',
  'div',
  'span',
])

export function sanitizeHtml(input: string | null | undefined): string {
  if (!input) return ''

  let html = input

  // Drop entire elements whose content must never render.
  html = html.replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1>/gi, '')
  html = html.replace(/<(script|style|iframe|object|embed|form)[^>]*\/?>/gi, '')

  // Rewrite every remaining tag, keeping only whitelisted names and, on links,
  // a safe href.
  html = html.replace(/<\/?([a-zA-Z0-9-]+)((?:[^>"']|"[^"]*"|'[^']*')*)>/g, (match, rawName, attrs) => {
    const name = String(rawName).toLowerCase()
    if (!ALLOWED_TAGS.has(name)) return ''

    if (match.startsWith('</')) return `</${name}>`

    if (name === 'a') {
      const href = /href\s*=\s*("([^"]*)"|'([^']*)')/i.exec(String(attrs))
      const value = (href?.[2] ?? href?.[3] ?? '').trim()

      // Only absolute http(s), site-relative and mailto links; this is what
      // blocks javascript: and data: URLs.
      const safe = /^(https?:\/\/|mailto:|\/)/i.test(value)
      if (!safe) return '<a>'

      const escaped = value.replace(/"/g, '&quot;')
      const external = /^https?:\/\//i.test(value)
      return external
        ? `<a href="${escaped}" target="_blank" rel="noopener noreferrer nofollow">`
        : `<a href="${escaped}">`
    }

    // Every other allowed tag keeps its name and loses all attributes, which
    // removes inline styles, event handlers and classes in one step.
    return `<${name}>`
  })

  return html
}
