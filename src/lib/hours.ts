/**
 * The opening-hours schedule, shared by the footer and the contact page.
 *
 * Both surfaces read their text from the CMS (global_settings.office_hours and
 * contact_page.business_hours_text respectively) and fall back to DEFAULT_HOURS
 * here, so the two never drift apart when only one of them has been edited.
 */

export type OpeningHour = { day: string; time: string }

/** Monday-first, matching how a week is normally read. */
export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Monday', time: '9 am–5 pm' },
  { day: 'Tuesday', time: '9 am–5 pm' },
  { day: 'Wednesday', time: '9 am–5 pm' },
  { day: 'Thursday', time: '9 am–5 pm' },
  { day: 'Friday', time: '9 am–5 pm' },
  { day: 'Saturday', time: '9 am–12 pm' },
  { day: 'Sunday', time: 'Closed' },
]

/** The same schedule as the "Day: time" text stored in the CMS. */
export const DEFAULT_HOURS = OPENING_HOURS.map(({ day, time }) => `${day}: ${time}`).join('\n')

/**
 * Splits an office-hours setting into day/time pairs. Each line is expected to
 * read "Day: time"; if any line doesn't match that shape the whole value is
 * treated as free text, so an unusual CMS entry renders as-is rather than as a
 * half-broken table.
 */
export function parseOpeningHours(value: string): OpeningHour[] {
  const rows = value
    .split(/[\n;]/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf(':')
      if (separator === -1) return null
      const day = line.slice(0, separator).trim()
      const time = line.slice(separator + 1).trim()
      return day && time ? { day, time } : null
    })

  return rows.length > 0 && rows.every((row) => row !== null) ? (rows as OpeningHour[]) : []
}

/** True for a day the business is shut — styled differently in both lists. */
export function isClosed(time: string): boolean {
  return /closed/i.test(time)
}
