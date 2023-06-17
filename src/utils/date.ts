export const compareDesc = (a: Date, b: Date) => {
  return a < b ? 1 : a > b ? -1 : 0
}

export const compareAsc = (a: Date, b: Date) => {
  return a > b ? 1 : a < b ? -1 : 0
}
