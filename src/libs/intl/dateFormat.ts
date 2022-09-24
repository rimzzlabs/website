/**
 * Given a date, format it in a human-readable way
 * @param {string | Date} date - The date to format.
 * @returns The date in the format of Month Day, Year.
 */
export const dateFormat = (date: string, locales?: string | string[], config?: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(locales ?? 'en-GB', config ?? { dateStyle: 'full' }).format(new Date(date))
}

/**
 * It takes a date string and returns an ISO date string
 * @param {string} date - The date string to convert to ISO format.
 */
export const dateStringToISO = (
  /** provide valid date value in string, for example: `05/05/2005` that's going to be **5 May 2005** */
  date: string
) => new Date(date).toISOString()
