import Link from '@/components/atoms/Link'

import { ArticleHeadProps } from '@/data/articles/articleType'

import clsx from 'clsx'

const ArticleCard: React.FC<ArticleHeadProps> = ({ title, slug, topics }) => (
  <div className={clsx('flex flex-col relative p-4', 'border rounded border-theme-300 dark:border-theme-700')}>
    <h3 className='mb-2 md:mb-4'>{title}</h3>
    <div className={clsx('flex items-center space-x-2 md:space-x-3')}>
      {topics.length > 0 &&
        topics.map((topic, index) => (
          <span className='text-xs md:text-sm' key={topic + index}>
            {topic}
          </span>
        ))}
    </div>

    <Link href={`/article/${slug}`} className={clsx('absolute inset-0 rounded')}>
      <span className='sr-only'>Read Article about project {title}</span>
    </Link>
  </div>
)

export default ArticleCard
