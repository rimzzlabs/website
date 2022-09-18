/**
 * A function to format number to compact display like social media you've ever known
 *
 * example: your `1000` number will be displayed `1K`
 * @param num - the number You want to format as a compact display
 * @returns the formatted number
 */
export const numberToCompact = (num: number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)
}
