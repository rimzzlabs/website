import type { Portfolio } from 'rizkicitra'

/**
 * A function to sort portfolios by latest update.
 * @returns a number.
 */
export const getNewestPortfolio = (a: Portfolio, b: Portfolio) => {
  return new Date(a.date) < new Date(b.date) ? 1 : new Date(a.date) > new Date(b.date) ? -1 : 0
}
