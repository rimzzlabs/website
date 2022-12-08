// PULL Request Button in case there is a typo on some post, other people can help you
import { UnstyledLink } from '@/UI/links'

import { HiExternalLink } from 'react-icons/hi'

type PRButtonProps = {
  path: string
}

/**
 * PULL Request Button in case there is a typo on some post, other people can help you.
 * The param path are the path directory to the file of slug.
 * `e.g:`
 * ```tsx
 * <EditButton path="/blog/slug.mdx" />
 * ```
 * @returns
 */
export const PRButton: React.FunctionComponent<PRButtonProps> = (props) => {
  return (
    <UnstyledLink
      title='Edit on GitHub'
      className='inline-flex items-center text-sm md:text-base py-1 max-w-max space-x-1.5 border-b-2 border-dashed border-theme-500 text-theme-800 dark:text-theme-200'
      href={`https://github.com/rizkimcitra/rizkicitra/edit/main/src/data` + props.path}
    >
      <HiExternalLink className='w-5 h-5' />
      <span>Edit on GitHub</span>
    </UnstyledLink>
  )
}
