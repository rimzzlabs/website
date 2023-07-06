import { useDebounceHandler } from './use-debounce-handler'

import { useCallback, useState } from 'react'

export const useCopyClipboard = (value?: string | null) => {
  const [state, setState] = useState({ isCopied: false, isCopying: false })
  useDebounceHandler(
    { state, setState },
    ({ setState, state }) => {
      if (state.isCopied) setState({ isCopied: false, isCopying: false })
    },
    { deps: [state], delay: 1200 },
  )

  const onClickCopy = useCallback(() => {
    setState((prev) => ({ ...prev, isCopying: true }))
    value && window.navigator.clipboard.writeText(value)
    setState({ isCopied: true, isCopying: false })
  }, [value])

  return [state, onClickCopy] as const
}
