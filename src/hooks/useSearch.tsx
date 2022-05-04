import { Blogs } from '@/data/blog/blog.type'
import { PortfolioHeadProps } from '@/data/portfolio/portfolio.type'

import React, { useEffect, useState } from 'react'

type Data = Array<Blogs> | Array<PortfolioHeadProps>

const useSearch = <T,>(data: Data, type: 'blog' | 'portfolio') => {
  const [query, setQuery] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Data>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  useEffect(() => {
    if (query.length > 0) {
      const mapArrayString = (t: string) => t.toLowerCase().includes(query.toLowerCase())

      if (type === 'blog') {
        const res = data as Array<Blogs>
        const newData = res.filter((r) => {
          return r.topics.map(mapArrayString).includes(true) || r.title.toLowerCase().includes(query.toLowerCase())
        })

        setFilteredData(newData)
      } else {
        const res = data as Array<PortfolioHeadProps>
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
    filteredData: filteredData as unknown as T
  }
}

export default useSearch
