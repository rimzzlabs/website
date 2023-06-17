const fmt = (config?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-GB', config)
}

export const compactNumber = (num: number, min?: number) => {
  if (min && num < min) return fmt().format(num)

  return fmt({ notation: 'compact' }).format(num)
}
