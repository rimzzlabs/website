import type { SingleProjectType } from '@/types/customType'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { IoGlobe, IoLogoGithub } from 'react-icons/io5'

const NextImage = dynamic(() => import('../NextImage'))
const NextLink = dynamic(() => import('../NextLink'))

/**
 * @description a card used for displaying a Card UI of Project, this component accept one props which is an object
 * @param attributes contains `singleProjectType` see the type on `src/types/customType.ts`
 * @returns JSX.Element
 */
const ProjectCard = ({ attributes: { title, description, url } }: SingleProjectType) => {
  const githubtxt = `see the code of ${title} on GitHub`
  const previewtxt = `see the live preview of ${title}`
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'w-full min-h-[8rem] rounded overflow-hidden',
        'border border-color transition-all duration-200'
      )}
    >
      <article className='w-full h-full p-2 md:p-4'>
        <figure className='relative aspect-[2/1]'>
          <NextImage fit='cover' className='rounded' src={url.image} alt={title} layoutFill />
        </figure>

        <section className='px-2'>
          <h3 className='my-2 md:my-4'>{title}</h3>
          <p className='max-w-2xl mb-1.5 md:mb-3'>{description.slice(0, 97)}...</p>

          <div className='flex items-center justify-end space-x-2 md:space-x-4'>
            <NextLink href={`https://github.com/rizkimcitra${url.github}`}>
              <span className='sr-only'>{githubtxt}</span>
              <IoLogoGithub
                title={githubtxt}
                className='text-[1.65em] md:text-[1.8em] transition hover:text-primary-500'
              />
            </NextLink>

            <NextLink href={url.preview}>
              <span className='sr-only'>{previewtxt}</span>
              <IoGlobe title={previewtxt} className='text-[1.65em] md:text-[1.8em] transition hover:text-primary-500' />
            </NextLink>
          </div>
        </section>
      </article>
    </div>
  )
}

export default ProjectCard
