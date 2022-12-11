import { toLowerCase } from '@/libs/string'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Blog } from 'rizkicitra'

export const useSearchBlog = (blogs: Blog[]) => {
  const [query, setQ] = useState('')
  const [filteredBlog, sFB] = useState<Blog[]>([])
  const mounted = useRef(true)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value), [])

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false
      return
    }

    ;(() => {
      if (blogs.length === 0) return

      const filtered = blogs.filter((blog) => {
        return (
          toLowerCase(blog.title).includes(toLowerCase(query)) ||
          toLowerCase(blog.summary).includes(toLowerCase(query)) ||
          blog.topics.map((t) => t.includes(query)).includes(true)
        )
      })

      sFB(filtered)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return {
    query,
    handleChange,
    filteredBlog
  }
}
