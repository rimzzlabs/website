import { P, match } from 'ts-pattern'

export type LocaleDate = 'en-GB' | 'id-ID'

const getActualDate = (date: string | Date) => {
  return match(date)
    .with(P.string, (value) => new Date(value))
    .with(P.instanceOf(Date), (value) => value)
    .exhaustive()
}

export const compareDesc = (a: Date, b: Date) => {
  return a < b ? 1 : a > b ? -1 : 0
}

export const compareAsc = (a: Date, b: Date) => {
  return a > b ? 1 : a < b ? -1 : 0
}

export const formatToISO = (date: string | Date) => {
  return getActualDate(date).toISOString()
}

export const formatDate = (
  date: string | Date,
  locale?: LocaleDate,
  config?: Intl.DateTimeFormatOptions,
) => {
  const fmt = new Intl.DateTimeFormat(locale ?? 'en-GB', config)
  const dateObject = getActualDate(date)

  return fmt.format(dateObject)
}

export const formatReadableDate = (date: string | Date, locale?: LocaleDate) => {
  return formatDate(date, locale, {
    day: 'numeric',
    weekday: 'long',
    month: 'short',
    year: 'numeric',
  })
}
