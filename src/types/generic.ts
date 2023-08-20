export type TReturn<TData, TError = Error> = readonly [TData, null] | readonly [null, TError]
