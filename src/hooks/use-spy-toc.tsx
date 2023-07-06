import { useEffect, useState } from 'react'

/**
 * The `useSpyToc` function is a custom React hook that uses the Intersection Observer API to track the
 * active item in a table of contents based on the scroll position.
 * @returns The function `useSpyToc` returns the value of `activeItem`, which is a string or null.
 */
export const useSpyToc = () => {
  const [activeItem, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLHeadingElement>('.heading-post')

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')

          if (entry.intersectionRatio > 0) {
            setActiveId(id)
          }
        })
      },

      { rootMargin: '-64px 0px -360px 0px' },
    )

    headings.forEach((heading) => obs.observe(heading))

    return () => {
      headings.forEach((heading) => obs.unobserve(heading))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return activeItem
}
