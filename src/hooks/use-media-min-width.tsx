import { useMediaQuery } from './use-media-query'

/**
 * This function returns a boolean value indicating whether the screen width is greater than or equal
 * to a specified minimum width.
 * @param {number} minWidth - The `minWidth` parameter is a number that represents the minimum width of
 * the screen in pixels. This custom hook `useMediaMinWidth` uses the `useMediaQuery` hook to check if
 * the screen width is greater than or equal to the specified `minWidth`. It returns a boolean value
 */
export const useMediaMinWidth = (minWidth: number) => useMediaQuery(`(min-width: ${minWidth}px)`)
