import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * It takes a list of class names, and returns a list of class names by using tailwind merge
 * to merge tailwind utilities without conflict.
 * `e.g`
 * ```tsx
 * import { twclsx } from '@/libs/twclsx'
 *
 * <Button className={twclsx('text-theme-200')}>Click Me</Button>
 * ```
 */
export const twclsx = (...args: ClassValue[]) => twMerge(clsx(...args))
