import type { SingleArticleType } from '@/types/customType'
import clsx from 'clsx'
import Label from '../atoms/Label'
import NextImage from '../NextImage'
import NextLink from '../NextLink'

const ArticleCard = ({ attributes, estRead }: SingleArticleType) => {
  const linkToPost = `/article/${attributes.slug}`
  return (
    <NextLink
      href={linkToPost}
      className={clsx(
        'group flex flex-col items-center justify-center',
        'w-full h-full overflow-hidden',
        'border rounded transition-all duration-75',
        'bg-white dark:bg-dark-900 border-dark-300 dark:border-dark-700',
        'hover:border-dark-400 dark:hover:border-dark-600'
      )}
    >
      <div className='w-full h-full p-2 md:p-4'>
        <figure className='relative aspect-[2/1]'>
          <NextImage
            fit='cover'
            className='rounded'
            src={attributes.image.src}
            alt={`Image from Unsplash by - ${attributes.image.author}`}
            layoutFill
          />
          <div className='absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-white/0 w-full h-1/5' />
          <div className='absolute bottom-1 left-1 flex items-center space-x-2 md:space-x-3'>
            {attributes.labels && attributes.labels.map((item, idx) => <Label type={item} key={idx + item} />)}
          </div>
        </figure>

        <section className='px-1.5 md:px-2 mt-2 md:mt-4'>
          <div className='flex items-center justify-between'>
            <h3 className='my-2 md:my-4'>{attributes.title}</h3>
            <span>{estRead.text}</span>
          </div>
          <p className='max-w-2xl mb-1.5 md:mb-3'>{attributes.description}</p>
        </section>
      </div>
    </NextLink>
  )
}

export default ArticleCard
