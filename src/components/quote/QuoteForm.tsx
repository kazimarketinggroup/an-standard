'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input, Select, Textarea, YesNo } from '../ui/Field'
import { EASE } from '../motion/Reveal'
import { cn } from '../../lib/utils'

const STEPS = ['About You', 'Your Specification', 'Anything else'] as const

const FILLINGS = [
  'Polyester wadding',
  'Recycled polyester',
  'Cotton',
  'Fibreglass',
  'Customer supplied',
  'Not sure — advise me',
]

const PATTERNS = [
  'Box quilting',
  'Diamond',
  'Wavy line',
  'Vertical line',
  'Hourglass',
  'Patchwork',
  'Bespoke / not listed',
]

type FormState = {
  name: string
  phone: string
  email: string
  company: string
  jobTitle: string
  fabricType: string
  supplyingFabric: 'yes' | 'no' | ''
  filling: string
  rollWidth: string
  pattern: string
  quantity: string
  waddingWeight: string
  endApplication: string
  notes: string
}

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  jobTitle: '',
  fabricType: '',
  supplyingFabric: '',
  filling: '',
  rollWidth: '',
  pattern: '',
  quantity: '',
  waddingWeight: '',
  endApplication: '',
  notes: '',
}

export default function QuoteForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    // No backend yet — collected values are held in state for wiring later.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-brand-cream p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-brand-ink sm:text-2xl">Thanks — that’s with us</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-muted">
          We’ll come back to you with a price. If it’s urgent, call{' '}
          <a href="tel:01215558101" className="font-medium text-brand-red">
            0121 555 8101
          </a>{' '}
          and we’ll talk it through.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(INITIAL)
            setStep(0)
            setSubmitted(false)
          }}
          className="btn-ghost mt-8"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-brand-cream p-6 shadow-card sm:p-8 lg:p-10">
      {/* Progress: a filled bar plus a label per step. */}
      <ol className="mb-8 grid grid-cols-3 gap-2">
        {STEPS.map((label, i) => {
          const done = i <= step
          return (
            <li key={label}>
              <div className="h-1 overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className={cn('h-full rounded-full', done ? 'bg-brand-red' : 'bg-transparent')}
                  initial={false}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </div>
              <p
                className={cn(
                  'mt-2 text-[11px] transition-colors',
                  i === step ? 'font-medium text-brand-ink' : 'text-brand-muted'
                )}
              >
                <span className="block text-[10px] uppercase tracking-wide text-brand-muted/70">
                  Step {i + 1}
                </span>
                {label}
              </p>
            </li>
          )
        })}
      </ol>

      <form onSubmit={handleSubmit} noValidate={false}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    id="name"
                    label="Name"
                    required
                    placeholder="Your name"
                    value={data.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                </div>
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  required
                  placeholder="Your phone number"
                  value={data.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                />
                <Input
                  id="company"
                  label="Company"
                  placeholder="Company name"
                  value={data.company}
                  onChange={(e) => set('company', e.target.value)}
                />
                <Input
                  id="jobTitle"
                  label="Job Title"
                  placeholder="Your role"
                  value={data.jobTitle}
                  onChange={(e) => set('jobTitle', e.target.value)}
                />
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="fabricType"
                  label="Fabric type"
                  required
                  placeholder="e.g. cotton twill, wax cotton"
                  value={data.fabricType}
                  onChange={(e) => set('fabricType', e.target.value)}
                />
                <YesNo
                  label="Are you supplying the fabric?"
                  name="supplyingFabric"
                  value={data.supplyingFabric}
                  onChange={(value) => set('supplyingFabric', value)}
                />

                <Select
                  id="filling"
                  label="Filling"
                  required
                  options={FILLINGS}
                  value={data.filling}
                  onChange={(e) => set('filling', e.target.value)}
                />
                <Input
                  id="rollWidth"
                  label="Roll width required (mm)"
                  required
                  placeholder="e.g. 1600"
                  inputMode="numeric"
                  value={data.rollWidth}
                  onChange={(e) => set('rollWidth', e.target.value)}
                />

                <Select
                  id="pattern"
                  label="Pattern"
                  options={PATTERNS}
                  value={data.pattern}
                  onChange={(e) => set('pattern', e.target.value)}
                />

                {/*
                  When we supply the fabric we also need the wadding weight,
                  so the "No" branch asks one extra question.
                */}
                {data.supplyingFabric === 'no' && (
                  <Input
                    id="waddingWeight"
                    label="Wadding weight (gsm)"
                    placeholder="e.g. 150"
                    inputMode="numeric"
                    value={data.waddingWeight}
                    onChange={(e) => set('waddingWeight', e.target.value)}
                  />
                )}

                <Input
                  id="quantity"
                  label="Quantity (metres or units)"
                  required
                  placeholder="e.g. 500m"
                  value={data.quantity}
                  onChange={(e) => set('quantity', e.target.value)}
                />
                <Input
                  id="endApplication"
                  label="End application"
                  placeholder="What the finished product is"
                  value={data.endApplication}
                  onChange={(e) => set('endApplication', e.target.value)}
                />
              </div>
            )}

            {step === 2 && (
              <Textarea
                id="notes"
                label="Write to us if anything else"
                rows={8}
                placeholder="Lead time, sample requirements, anything we should know."
                value={data.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-3">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-ghost">
              Back
            </button>
          )}
          <button type="submit" className="btn-primary">
            {step === STEPS.length - 1 ? 'Send enquiry' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}
