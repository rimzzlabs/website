/**
 * Given a date, format it in a human-readable way
 * @param {string | Date} date - The date to format.
 * @returns The date in the format of Month Day, Year.
 */
const dateFormat = (date: string, locales?: string | string[], config?: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(locales ?? 'en-GB', config ?? { dateStyle: 'full' }).format(new Date(date))
}

export const dateStringToISO = (date: string) => new Date(date).toISOString()

export default dateFormat
