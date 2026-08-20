import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const controlClass =
  'w-full rounded-md border border-black/12 bg-white px-3.5 py-2.5 text-sm text-brand-ink ' +
  'placeholder:text-brand-muted/60 transition-colors ' +
  'focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 ' +
  'disabled:cursor-not-allowed disabled:bg-black/5'

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-brand-ink">
      {children}
      {required && <span className="text-brand-red">*</span>}
    </label>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }

export function Input({ label, id, required, className, ...props }: InputProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input id={id} required={required} className={cn(controlClass, className)} {...props} />
    </div>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  id: string
  options: string[]
  placeholder?: string
}

export function Select({
  label,
  id,
  options,
  placeholder = 'Select',
  required,
  className,
  ...props
}: SelectProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select id={id} required={required} className={cn(controlClass, className)} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; id: string }

export function Textarea({ label, id, required, className, rows = 6, ...props }: TextareaProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        className={cn(controlClass, 'resize-y', className)}
        {...props}
      />
    </div>
  )
}

/** Inline Yes/No pair used for the fabric-supply branch. */
export function YesNo({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: 'yes' | 'no' | ''
  onChange: (value: 'yes' | 'no') => void
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-xs font-medium text-brand-ink">{label}</legend>
      <div className="flex items-center gap-5 pt-1.5">
        {(['yes', 'no'] as const).map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm text-brand-ink"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 accent-brand-red"
            />
            {option === 'yes' ? 'Yes' : 'No'}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
