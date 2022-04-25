import UnderlineLink from '@/components/mollecules/UnderlineLink'

import clsx from 'clsx'
import { HiExternalLink } from 'react-icons/hi'

interface EditButtonProps {
  path: string
}

/**
 * the param path are the path directory to the file of slug.
 * `e.g:`
 * ```tsx
 * <EditButton path="/blog/slug.mdx" />
 * ```
 * @returns
 */
const EditButton: React.FunctionComponent<EditButtonProps> = ({ path }) => {
  return (
    <div className={clsx('flex items-center gap-2 mt-10')}>
      <HiExternalLink className={clsx('text-lg md:text-xl')} />
      <UnderlineLink
        title='Edit on GitHub'
        className={clsx('text-sm md:text-base', 'text-theme-800 dark:text-theme-200')}
        href={`https://github.com/rizkimcitra/rizkicitra/edit/main/src/data` + path}
      >
        Edit this on GitHub
      </UnderlineLink>
    </div>
  )
}

export default EditButton
