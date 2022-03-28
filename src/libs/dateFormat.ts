/**
 * Given a date, format it in a human-readable way
 * @param {string | Date} date - The date to format.
 * @returns The date in the format of Month Day, Year.
 */
const dateFormat = (date: string | Date, config?: Intl.DateTimeFormatOptions) => {
  const fmt = new Intl.DateTimeFormat(
    'en-US',
    config ?? {
      dateStyle: 'medium'
    }
  )
  if (typeof date === 'string') {
    return fmt.format(new Date(date))
  }

  return fmt.format(date)
}

export default dateFormat
