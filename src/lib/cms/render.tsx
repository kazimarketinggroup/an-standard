import { Fragment } from 'react'

/**
 * Renders newlines in a CMS string as <br>.
 *
 * Several headings are deliberately broken across lines in the design. The
 * client controls that by pressing Enter in a textarea, which arrives here as
 * "\n" — React would otherwise collapse it into a space.
 */
export function multiline(value: string | null | undefined) {
  if (!value) return null

  const lines = value.split('\n')
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ))
}
