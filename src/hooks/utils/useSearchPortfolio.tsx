import { toLowerCase } from '@/libs/string'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Portfolio } from 'rizkicitra'

export const useSearchPortfolio = (portfolios: Portfolio[]) => {
  const [query, setQ] = useState('')
  const [filteredPortfolio, sFS] = useState<Portfolio[]>([])
  const mounted = useRef(true)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value), [])

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false
      return
    }

    ;(() => {
      if (portfolios.length === 0) return

      const filtered = portfolios.filter((portfo) => {
        return (
          toLowerCase(portfo.title).includes(toLowerCase(query)) ||
          toLowerCase(portfo.summary).includes(toLowerCase(query)) ||
          portfo.stack.map((s) => toLowerCase(s).includes(toLowerCase(query))).includes(true)
        )
      })

      sFS(filtered)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return {
    query,
    handleChange,
    filteredPortfolio
  }
}
