import Link from '@/components/atoms/Link'

import { ArticleHeadProps } from '@/data/articles/articleType'

import Label from '../atoms/Label'

import clsx from 'clsx'

const ArticleCard: React.FC<ArticleHeadProps> = ({ title, slug, topics }) => (
  <div className={clsx('flex flex-col relative p-4', 'border rounded border-theme-300 dark:border-theme-700')}>
    <h3 className='mb-2 md:mb-4'>{title}</h3>
    <div className={clsx('flex items-center mt-auto space-x-2 md:space-x-3')}>
      {topics.length > 0 && topics.map((topic, index) => <Label type={topic} key={topic + index} />)}
    </div>

    <Link href={`/article/${slug}`} className={clsx('absolute inset-0 rounded')}>
      <span className='sr-only'>Read Article about project {title}</span>
    </Link>
  </div>
)

export default ArticleCard
