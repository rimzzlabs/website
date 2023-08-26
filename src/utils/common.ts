import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type TComposedFunc<TData = unknown> = (data: TData) => TData

/**
 * The `compose` function takes in multiple functions and returns a new function that applies each
 * function in reverse order to a given value.
 * @param {TComposedFunc<TData>[]} fns - An array of functions that will be composed together. Each
 * function in the array should accept a value of type TData and return a value of type TData.
 * @returns The `compose` function returns a new function that takes a value of type `TData` as an
 * argument.
 */
export const compose = <TData = unknown>(...fns: TComposedFunc<TData>[]) => {
  return (value: TData) => fns.reduce((acc, fn) => fn(acc), value)
}

/**
 * This is a TypeScript function that takes an array of class names and returns a merged class name
 * string using the twMerge and clsx functions.
 * @param {ClassValue[]} className - `className` is an array of class names or class values that will
 * be passed to the `clsx` function to generate a single string of class names. The resulting string
 * will then be passed to the `twMerge` function to generate a Tailwind CSS class name. This function
 * is commonly used
 */
export const tw = (...classNames: ClassValue[]) => twMerge(clsx(...classNames))

/**
 * The `slugify` function takes a string as input and returns a slugified version of the string by
 * converting it to lowercase, replacing non-alphanumeric characters with hyphens, and removing leading
 * and trailing hyphens.
 * @param {string} s - The parameter `s` is a string that needs to be slugified.
 * @returns The function `slugify` returns a string that has been converted to lowercase and has all
 * non-alphanumeric characters replaced with hyphens. Additionally, any leading or trailing hyphens are
 * removed.
 */
export const slugify = (s: string) => {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
