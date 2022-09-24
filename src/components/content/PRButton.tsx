// PULL Request Button in case there is a typo on some post, other people can help you
import { UnderlineLink } from '@/UI/links'

import { twclsx } from '@/libs/twclsx'

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
    <div className={twclsx('flex items-center gap-2 mt-10')}>
      <HiExternalLink className={twclsx('text-lg md:text-xl')} />
      <UnderlineLink
        title='Edit on GitHub'
        className={twclsx('text-sm md:text-base', 'text-theme-800 dark:text-theme-200')}
        href={`https://github.com/rizkimcitra/rizkicitra/edit/main/src/data` + props.path}
      >
        Edit this on GitHub
      </UnderlineLink>
    </div>
  )
}
