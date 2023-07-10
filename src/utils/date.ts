import { P, match } from 'ts-pattern'

export type LocaleDate = 'en-GB' | 'id-ID'

/**
 * The `getActualDate` function takes a string or a Date object as input and returns a Date object
 * representing the actual date.
 * @param {string | Date} date - The `date` parameter can be either a string or a Date object.
 * @returns The function `getActualDate` returns a `Date` object.
 */
const getActualDate = (date: string | Date) => {
  return match(date)
    .with(P.string, (value) => new Date(value))
    .with(P.instanceOf(Date), (value) => value)
    .exhaustive()
}

/**
 * The function `compareDesc` compares two dates in descending order.
 * @param {Date} a - The first parameter `a` is a Date object representing a date and time.
 * @param {Date} b - b is a Date object that represents a date and time.
 * @returns 1 if `a` is less than `b`, -1 if `a` is greater than `b`, and 0 if `a` is equal to `b`.
 */
export const compareDesc = (a: Date, b: Date) => {
  return a < b ? 1 : a > b ? -1 : 0
}

/**
 * The function `compareAsc` compares two dates and returns 1 if the first date is greater, -1 if the
 * second date is greater, and 0 if the dates are equal.
 * @param {Date} a - The parameter "a" is a Date object representing the first date to be compared.
 * @param {Date} b - The parameter `b` is a `Date` object.
 * @returns 1 if `a` is greater than `b`, -1 if `a` is less than `b`, and 0 if `a` is equal to `b`.
 */
export const compareAsc = (a: Date, b: Date) => {
  return a > b ? 1 : a < b ? -1 : 0
}

export const formatToISO = (date: string | Date) => {
  return getActualDate(date).toISOString()
}

/**
 * The `formatDate` function formats a given date string or Date object according to the specified
 * locale and configuration options.
 * @param {string | Date} date - The `date` parameter can be either a string or a Date object. It
 * represents the date that you want to format.
 * @param {LocaleDate} [locale] - The `locale` parameter is an optional parameter that specifies the
 * locale or language for formatting the date. It can be a string representing a BCP 47 language tag,
 * such as 'en-US' for English (United States) or 'fr-FR' for French (France). If no locale
 * @param [config] - The `config` parameter is an optional object that allows you to customize the
 * formatting options for the date. It can include properties such as `weekday`, `year`, `month`,
 * `day`, `hour`, `minute`, `second`, `timeZone`, `hour12`, `hourCycle`,
 * @returns The function `formatDate` returns a formatted date string based on the provided `date`,
 * `locale`, and `config` parameters.
 */
export const formatDate = (
  date: string | Date,
  locale?: LocaleDate,
  config?: Intl.DateTimeFormatOptions,
) => {
  const fmt = new Intl.DateTimeFormat(locale ?? 'en-GB', config)
  const dateObject = getActualDate(date)

  return fmt.format(dateObject)
}

/**
 * The function `formatReadableDate` formats a given date into a readable format with options for
 * specifying the locale.
 * @param {string | Date} date - The `date` parameter can be either a string or a Date object. It
 * represents the date that you want to format.
 * @param {LocaleDate} [locale] - The `locale` parameter is an optional parameter that specifies the
 * locale to be used for formatting the date. It can be a string representing a BCP 47 language tag,
 * such as "en-US" for English (United States), or an object representing a custom locale
 * configuration. If no locale is
 * @returns The function `formatReadableDate` returns a formatted date string in a readable format.
 */
export const formatReadableDate = (date: string | Date, locale?: LocaleDate) => {
  return formatDate(date, locale, {
    day: 'numeric',
    weekday: 'short',
    month: 'short',
    year: 'numeric',
  })
}
