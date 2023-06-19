export const compareDesc = (a: Date, b: Date) => {
  return a < b ? 1 : a > b ? -1 : 0
}

export const compareAsc = (a: Date, b: Date) => {
  return a > b ? 1 : a < b ? -1 : 0
}

export const formatDate = (date: string | Date, config?: Intl.DateTimeFormatOptions) => {
  const fmt = new Intl.DateTimeFormat('en-GB', config)

  if (typeof date === 'string') {
    return fmt.format(new Date(date))
  }

  return fmt.format(date)
}
