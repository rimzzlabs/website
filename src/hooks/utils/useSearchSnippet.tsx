import { toLowerCase } from '@/libs/string'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Snippet } from 'rizkicitra'

export const useSearchSnippet = (snippets: Snippet[]) => {
  const [query, setQ] = useState('')
  const [filteredSnippet, sFS] = useState<Snippet[]>([])
  const mounted = useRef(true)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value), [])

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false
      return
    }

    ;(() => {
      if (snippets.length === 0) return

      const filtered = snippets.filter((snippet) => {
        return (
          toLowerCase(snippet.title).includes(toLowerCase(query)) ||
          toLowerCase(snippet.topic).includes(toLowerCase(query)) ||
          toLowerCase(snippet.summary).includes(toLowerCase(query))
        )
      })

      sFS(filtered)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return {
    query,
    handleChange,
    filteredSnippet
  }
}
