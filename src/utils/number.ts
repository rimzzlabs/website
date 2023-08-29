const fmt = (config?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', config)
}

export const compactNumber = (num: number, min?: number) => {
  if (min && num < min) return fmt().format(num)

  return fmt({ notation: 'compact', maximumFractionDigits: 2 }).format(num)
}

export const formatNumber = (num: number) => fmt().format(num)
