import Label from '@/components/atoms/Label'
import Link from '@/components/atoms/Link'

import { ArticleHeadProps } from '@/data/articles/article.type'

import clsx from 'clsx'
import NextLink from 'next/link'
import readingTime from 'reading-time'

interface ArticleCardProps extends ArticleHeadProps {
  ogLink?: boolean
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, slug, topics, content, ogLink }) => {
  const estRead = readingTime(content)
  return (
    <div className={clsx('relative flex flex-col p-3 h-full', 'bg-theme-50 dark:bg-theme-900')}>
      <h3 className='mb-2 md:mb-4'>{title}</h3>
      <div className={clsx('flex items-center justify-between mt-auto w-full')}>
        {topics.length > 0 && (
          <div className={clsx('flex items-center space-x-2 md:space-x-3')}>
            {topics.map((topic, index) => (
              <Label type={topic} key={topic + index} />
            ))}
          </div>
        )}
        <span className='text-sm'>{estRead.text}</span>
      </div>

      {ogLink ? (
        <NextLink href={`/article/${slug}`}>
          <a className={clsx('absolute inset-0 rounded')}>
            <span className='sr-only'>Read Article about {title}</span>
          </a>
        </NextLink>
      ) : (
        <Link href={`/article/${slug}`} className={clsx('absolute inset-0 rounded')}>
          <span className='sr-only'>Read Article about {title}</span>
        </Link>
      )}
    </div>
  )
}

export default ArticleCard
