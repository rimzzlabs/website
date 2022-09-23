import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Blog, Portfolio } from 'rizkicitra'

type Data = Array<Blog> | Array<Portfolio>

export const useSearch = <T,>(data: Data, type: 'blog' | 'portfolio') => {
  const [query, setQuery] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Data>([])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), [])

  useEffect(() => {
    if (query.length > 0) {
      const mapArrayString = (t: string) => t.toLowerCase().includes(query.toLowerCase())

      if (type === 'blog') {
        const res = data as Array<Blog>
        const newData = res.filter((r) => {
          return r.topics.map(mapArrayString).includes(true) || r.title.toLowerCase().includes(query.toLowerCase())
        })

        setFilteredData(newData)
      } else {
        const res = data as Array<Portfolio>
        const newData = res.filter((r) => {
          return r.stack.map(mapArrayString).includes(true) || r.title.toLowerCase().includes(query.toLowerCase())
        })

        setFilteredData(newData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return {
    query,
    handleChange,
    filteredData: useMemo(() => filteredData, [filteredData]) as unknown as T
  }
}
