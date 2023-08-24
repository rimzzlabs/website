type TComposedFunc<TData = unknown> = (data: TData) => TData

export const compose = <TData = unknown>(...fns: TComposedFunc<TData>[]) => {
  return (value: TData) => fns.reduce((acc, fn) => fn(acc), value)
}
