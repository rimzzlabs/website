import type { SingleProjectType } from '@/types/customType'
import clsx from 'clsx'
import NextImage from '../NextImage'
import NextLink from '../NextLink'
import { IoGlobe, IoLogoGithub } from 'react-icons/io5'

const ProjectCard = ({
  attributes: { title, description, url }
}: SingleProjectType) => {
  const githubtxt = `see the code of ${title} on GitHub`
  const previewtxt = `see the live preview of ${title}`
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'w-full min-h-[8rem] overflow-hidden',
        'border rounded transition-all duration-75',
        'bg-white dark:bg-dark-800 dark:hover:bg-dark-700 border-dark-300 hover:border-dark-500 dark:border-transparent'
      )}>
      <article className='w-full h-full p-2 md:p-4'>
        <figure className='relative aspect-[2/1]'>
          <NextImage
            fit='cover'
            className='rounded'
            src={url.image}
            alt={title}
            layoutFill
          />
        </figure>

        <section className='px-2'>
          <h3 className='my-2 md:my-4'>{title}</h3>
          <p className='max-w-2xl mb-1.5 md:mb-3'>
            {description.slice(0, 97)}...
          </p>
          <div className='flex items-center space-x-2 md:space-x-4'>
            <NextLink
              target='_blank'
              rel='noopener noreferrer'
              href={url.github}>
              <span className='sr-only'>{githubtxt}</span>
              <IoLogoGithub
                title={githubtxt}
                className='text-[1.25em] transition hover:text-primary-500'
              />
            </NextLink>
            <NextLink
              target='_blank'
              rel='noopener noreferrer'
              href={url.preview}>
              <span className='sr-only'>{previewtxt}</span>
              <IoGlobe
                title={previewtxt}
                className='text-[1.25em] transition hover:text-primary-500'
              />
            </NextLink>
          </div>
        </section>
      </article>
    </div>
  )
}

export default ProjectCard
