import { usePathname } from 'next/navigation'

export const usePostSlug = () => {
  const pathname = usePathname()
  const slug = pathname.split('/')[2]

  return slug
}
