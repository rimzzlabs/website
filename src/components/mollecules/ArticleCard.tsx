import Link from '@/components/atoms/Link'

import { ArticleHeadProps } from '@/data/articles/articleType'

import Label from '../atoms/Label'

import clsx from 'clsx'
import readingTime from 'reading-time'

const ArticleCard: React.FC<ArticleHeadProps> = ({ title, slug, topics, content }) => {
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

      <Link href={`/article/${slug}`} className={clsx('absolute inset-0 rounded')}>
        <span className='sr-only'>Read Article about project {title}</span>
      </Link>
    </div>
  )
}

export default ArticleCard
