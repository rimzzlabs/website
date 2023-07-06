import { type DependencyList, useCallback, useEffect } from 'react'

type DebounceHandler<T> = (value: T) => void
type DebounceOption = {
  delay?: number
  deps?: DependencyList
}

export const useDebounceHandler = <T,>(
  value: T,
  fn: DebounceHandler<T>,
  option?: DebounceOption,
) => {
  const deps = option?.deps ?? []

  const timeoutHandler = useCallback(() => {
    fn(value)
  }, [fn, value])

  useEffect(() => {
    const timeoutId = setTimeout(timeoutHandler, option?.delay ?? 500)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, option, ...deps])
}
