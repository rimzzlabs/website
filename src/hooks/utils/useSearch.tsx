import { useCallback, useMemo, useState, useTransition } from 'react'
import type { Blog, Portfolio, Snippet } from 'rizkicitra'

type Data = Array<Blog> | Array<Portfolio> | Array<Snippet>

export const useSearch = <T,>(data: Data, type: 'blog' | 'portfolio' | 'snippet') => {
  const [query, setQuery] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const [filteredData, setFilteredData] = useState<Data>([])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      startTransition(() => {
        const mapArrayString = (t: string) => t.toLowerCase().includes(e.target.value.toLowerCase())

        if (type === 'blog') {
          const res = data as Array<Blog>
          const newData = res.filter((r) => {
            return (
              r.topics.map(mapArrayString).includes(true) ||
              r.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
          })

          setFilteredData(newData)
        } else if (type === 'portfolio') {
          const res = data as Array<Portfolio>
          const newData = res.filter((r) => {
            return (
              r.stack.map(mapArrayString).includes(true) || r.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
          })

          setFilteredData(newData)
        } else if (type === 'snippet') {
          const res = data as Array<Snippet>
          const newData = res.filter((r) => {
            return (
              r.topic.toLowerCase().includes(e.target.value.toLowerCase()) ||
              r.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
              r.summary.toLowerCase().includes(e.target.value.toLowerCase())
            )
          })

          setFilteredData(newData)
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  return {
    isPending,
    query,
    handleChange,
    filteredData: useMemo(() => filteredData, [filteredData]) as unknown as T
  }
}
