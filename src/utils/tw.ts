import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * This is a TypeScript function that takes an array of class names and returns a merged class name
 * string using the twMerge and clsx functions.
 * @param {ClassValue[]} className - `className` is an array of class names or class values that will
 * be passed to the `clsx` function to generate a single string of class names. The resulting string
 * will then be passed to the `twMerge` function to generate a Tailwind CSS class name. This function
 * is commonly used
 */
export const tw = (...className: ClassValue[]) => twMerge(clsx(...className))
