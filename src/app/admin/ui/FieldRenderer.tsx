'use client'

import type { Field } from '@/lib/cms/schema'
import { iconKeys } from '@/lib/cms/icons'
import ImageField from './ImageField'
import RepeatableList from './RepeatableList'
import RichTextField from './RichTextField'

const inputClass =
  'w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none ' +
  'focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'

const smallInputClass =
  'w-full rounded border border-neutral-300 px-2 py-1.5 text-sm outline-none ' +
  'focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'

type Props = {
  field: Field
  value: unknown
  onChange: (value: unknown) => void
  /** Options for selects whose choices come from another collection. */
  dynamicOptions?: { value: string; label: string }[]
}

/** Renders one field from the schema. */
export default function FieldRenderer({ field, value, onChange, dynamicOptions }: Props) {
  const list = Array.isArray(value) ? value : []

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          rows={field.rows ?? 4}
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )

    case 'number':
      return (
        <input
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${inputClass} max-w-[8rem]`}
        />
      )

    case 'boolean':
      return (
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300"
          />
          <span className="text-neutral-700">Yes</span>
        </label>
      )

    case 'select': {
      const options =
        dynamicOptions ??
        field.options ??
        // The icon picker is the one select whose choices come from code.
        iconKeys.map((key) => ({ value: key, label: key }))

      return (
        <select
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} max-w-sm`}
        >
          <option value="">— none —</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    case 'image':
      return <ImageField value={String(value ?? '')} onChange={(url) => onChange(url)} />

    case 'richtext':
      return <RichTextField value={String(value ?? '')} onChange={(html) => onChange(html)} />

    case 'stringList':
      return (
        <RepeatableList<string>
          items={list as string[]}
          onChange={onChange}
          makeEmpty={() => ''}
          addLabel="Add"
          renderItem={(item, update) => (
            <textarea
              rows={2}
              value={item}
              onChange={(e) => update(e.target.value)}
              className={smallInputClass}
            />
          )}
        />
      )

    case 'specList':
      return (
        <RepeatableList<{ label: string; value: string }>
          items={list as { label: string; value: string }[]}
          onChange={onChange}
          makeEmpty={() => ({ label: '', value: '' })}
          addLabel="Add row"
          renderItem={(item, update) => (
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                placeholder="Label"
                value={item?.label ?? ''}
                onChange={(e) => update({ ...item, label: e.target.value })}
                className={smallInputClass}
              />
              <input
                placeholder="Value"
                value={item?.value ?? ''}
                onChange={(e) => update({ ...item, value: e.target.value })}
                className={smallInputClass}
              />
            </div>
          )}
        />
      )

    case 'linkList':
      return (
        <RepeatableList<{ label: string; url: string }>
          items={list as { label: string; url: string }[]}
          onChange={onChange}
          makeEmpty={() => ({ label: '', url: '' })}
          addLabel="Add link"
          renderItem={(item, update) => (
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                placeholder="Label"
                value={item?.label ?? ''}
                onChange={(e) => update({ ...item, label: e.target.value })}
                className={smallInputClass}
              />
              <input
                placeholder="https://…"
                value={item?.url ?? ''}
                onChange={(e) => update({ ...item, url: e.target.value })}
                className={smallInputClass}
              />
            </div>
          )}
        />
      )

    case 'imageList':
      return (
        <RepeatableList<{ src: string; alt: string }>
          items={list as { src: string; alt: string }[]}
          onChange={onChange}
          makeEmpty={() => ({ src: '', alt: '' })}
          addLabel="Add image"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <ImageField
                value={item?.src ?? ''}
                onChange={(url) => update({ ...item, src: url })}
              />
              <input
                placeholder="Image description"
                value={item?.alt ?? ''}
                onChange={(e) => update({ ...item, alt: e.target.value })}
                className={smallInputClass}
              />
            </div>
          )}
        />
      )

    case 'stepList':
      return (
        <RepeatableList<{ title: string; description: string; image?: string }>
          items={list as { title: string; description: string; image?: string }[]}
          onChange={onChange}
          makeEmpty={() => ({ title: '', description: '', image: '' })}
          addLabel="Add step"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <input
                placeholder="Step title"
                value={item?.title ?? ''}
                onChange={(e) => update({ ...item, title: e.target.value })}
                className={smallInputClass}
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={item?.description ?? ''}
                onChange={(e) => update({ ...item, description: e.target.value })}
                className={smallInputClass}
              />
              <ImageField
                value={item?.image ?? ''}
                onChange={(url) => update({ ...item, image: url })}
              />
            </div>
          )}
        />
      )

    case 'buttonList':
      return (
        <RepeatableList<{ label: string; href: string; style: string }>
          items={list as { label: string; href: string; style: string }[]}
          onChange={onChange}
          makeEmpty={() => ({ label: '', href: '', style: 'primary' })}
          addLabel="Add button"
          renderItem={(item, update) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <input
                placeholder="Button text"
                value={item?.label ?? ''}
                onChange={(e) => update({ ...item, label: e.target.value })}
                className={smallInputClass}
              />
              <input
                placeholder="/quote or tel:…"
                value={item?.href ?? ''}
                onChange={(e) => update({ ...item, href: e.target.value })}
                className={smallInputClass}
              />
              <select
                value={item?.style ?? 'primary'}
                onChange={(e) => update({ ...item, style: e.target.value })}
                className={smallInputClass}
              >
                <option value="primary">Red</option>
                <option value="outline">Outline</option>
                <option value="call">Phone (yellow)</option>
              </select>
            </div>
          )}
        />
      )

    case 'sectionList':
      return (
        <RepeatableList<{ heading: string; paragraphs: string[] }>
          items={list as { heading: string; paragraphs: string[] }[]}
          onChange={onChange}
          makeEmpty={() => ({ heading: '', paragraphs: [''] })}
          addLabel="Add section"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <input
                placeholder="Section heading"
                value={item?.heading ?? ''}
                onChange={(e) => update({ ...item, heading: e.target.value })}
                className={smallInputClass}
              />
              <div className="rounded border border-neutral-200 bg-white p-2">
                <p className="mb-1.5 text-xs font-medium text-neutral-500">Paragraphs</p>
                <RepeatableList<string>
                  items={Array.isArray(item?.paragraphs) ? item.paragraphs : []}
                  onChange={(next) => update({ ...item, paragraphs: next })}
                  makeEmpty={() => ''}
                  addLabel="Add paragraph"
                  renderItem={(paragraph, updateParagraph) => (
                    <textarea
                      rows={3}
                      value={paragraph}
                      onChange={(e) => updateParagraph(e.target.value)}
                      className={smallInputClass}
                    />
                  )}
                />
              </div>
            </div>
          )}
        />
      )

    case 'text':
    default:
      return (
        <input
          type="text"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )
  }
}
