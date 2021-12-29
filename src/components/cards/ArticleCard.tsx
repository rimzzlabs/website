import type { SingleArticleType } from '@/types/customType'

import clsx from 'clsx'
import Dynamic from 'next/dynamic'

const NextLink = Dynamic(() => import('../NextLink'))
const Label = Dynamic(() => import('../atoms/Label'))

const ArticleCard = ({ attributes, estRead }: SingleArticleType) => {
  const linkToPost = `/article/${attributes.slug}`
  return (
    <NextLink
      href={linkToPost}
      className={clsx(
        'flex flex-col items-center justify-center',
        'w-full h-full rounded overflow-hidden',
        'border border-color transition-all duration-200'
      )}
    >
      <div className='w-full h-full p-2 md:p-4'>
        <section className='px-1.5 md:px-2 mt-2 md:mt-4'>
          <div className='flex items-center space-x-2 md:space-x-3'>
            {attributes.labels && attributes.labels.map((item, idx) => <Label type={item} key={idx + item} />)}
          </div>
          <div className='flex items-center justify-between '>
            <h3 className='my-2 md:my-4 max-w-[14rem] md:max-w-full group-hover:decoration-primary-500 dark:group-hover:decoration-rose-500'>
              {attributes.title}
            </h3>
            <span className='text-xs sm:text-sm'>{estRead.text}</span>
          </div>
          <p className='max-w-2xl mb-1.5 md:mb-3'>{attributes.description}</p>
        </section>
      </div>
    </NextLink>
  )
}

export default ArticleCard
