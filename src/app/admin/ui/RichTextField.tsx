'use client'

import { useEffect, useRef } from 'react'

/**
 * Minimal rich text editor, used only by the three legal pages.
 *
 * Built on contentEditable + document.execCommand. That API is deprecated but
 * still works in every current browser, and it avoids adding an editor
 * dependency for three rarely-touched pages. The toolbar is intentionally
 * limited to bold, italic, link and lists — no headings, colours or fonts, so
 * the client cannot break the page's typography.
 */
export default function RichTextField({
  value,
  onChange,
}: {
  value: string
  onChange: (html: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Only write into the DOM when the incoming value differs, otherwise every
  // keystroke would reset the caret to the start.
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value
    }
  }, [value])

  function exec(command: string, arg?: string) {
    document.execCommand(command, false, arg)
    ref.current?.focus()
    if (ref.current) onChange(ref.current.innerHTML)
  }

  function addLink() {
    const url = window.prompt('Link address (including https://)')
    if (!url) return
    if (!/^https?:\/\//i.test(url) && !url.startsWith('/') && !url.startsWith('mailto:')) {
      window.alert('Enter a full address starting with https://')
      return
    }
    exec('createLink', url)
  }

  const buttons = [
    { label: 'B', title: 'Bold', action: () => exec('bold'), className: 'font-bold' },
    { label: 'I', title: 'Italic', action: () => exec('italic'), className: 'italic' },
    { label: 'Link', title: 'Insert link', action: addLink, className: '' },
    {
      label: '• List',
      title: 'Bulleted list',
      action: () => exec('insertUnorderedList'),
      className: '',
    },
    {
      label: '1. List',
      title: 'Numbered list',
      action: () => exec('insertOrderedList'),
      className: '',
    },
    {
      label: 'Clear',
      title: 'Remove formatting',
      action: () => exec('removeFormat'),
      className: '',
    },
  ]

  return (
    <div className="overflow-hidden rounded-md border border-neutral-300 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-neutral-200 bg-neutral-50 p-1.5">
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            title={button.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={button.action}
            className={`rounded border border-neutral-300 bg-white px-2 py-1 text-xs
                        transition-colors hover:bg-neutral-100 ${button.className}`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        // Paste as plain text so copied Word/web markup cannot bring its own
        // styling into the page.
        onPaste={(e) => {
          e.preventDefault()
          const text = e.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        }}
        className="min-h-[220px] px-3 py-2 text-sm leading-relaxed outline-none
                   [&_a]:text-blue-600 [&_a]:underline [&_li]:ml-4 [&_ol]:list-decimal
                   [&_p]:mb-3 [&_ul]:list-disc"
      />
    </div>
  )
}
