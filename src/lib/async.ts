import { toast } from 'sonner'

type WithSonnerPromiseOptions = Partial<{
	loading: string
	success: string
	error: string
}> & {
	onSettled?: () => void
}

/**
 * Wraps a promise-returning function with Sonner toast notifications.
 *
 * @template A - The argument types of the function.
 * @template R - The return type of the promise.
 *
 * @param {(...args: A) => Promise<R>} fn - The function that returns a promise.
 * @param {WithSonnerPromiseOptions} [options] - Optional configuration for toast messages and a callback.
 *
 * @returns  - A function that, when called, executes `fn` and displays toast notifications.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function withSonnerPromise<A extends Array<any>, R>(
	fn: (...args: A) => Promise<R> | R,
	options?: WithSonnerPromiseOptions,
) {
	let texts = {
		loading: options?.loading ?? 'Processing Request',
		success: options?.success ?? 'Request Has Completed',
		error: options?.error ?? 'Something went wrong',
	}

	return (...args: A) => {
		toast.promise(fn(...args) as Promise<R>, {
			...texts,
			finally: options?.onSettled,
		})
	}
}
