import type { Portfolio } from 'rizkicitra'

export const getNewestPortfolio = (a: Portfolio, b: Portfolio) => {
  return new Date(a.date) < new Date(b.date) ? 1 : new Date(a.date) > new Date(b.date) ? -1 : 0
  // return new Date(a.header.date) < new Date(b.header.date)
  //   ? 1
  //   : new Date(a.header.date) > new Date(b.header.date)
  //   ? -1
  //   : 0
}
