import { CustomLink } from './custom-link'

import buildUrl from 'cloudinary-build-url'
import { MoveLeft } from 'lucide-react'
import Image from 'next/image'

type NotFoundProps = {
  title: string
  description: string
  restoreUrl?: string
  restoreText?: string
}

export const NotFound = (props: NotFoundProps) => {
  const src = buildUrl('rizkicitra.dev/not-found-illustration.svg', {
    cloud: {
      cloudName: 'rizkicitra',
    },
  })

  return (
    <section className='flex flex-col items-center justify-center w-full h-[calc(100vh-5rem)]'>
      <Image
        priority
        width={144}
        height={144}
        alt='Not Found Illustration'
        title='Not Found Illustration'
        src={src}
      />
      <h1 className='mt-6 md:text-5xl'>{props.title}</h1>
      <p className='mt-6 mb-3'>{props.description}</p>
      <CustomLink
        flex
        className='items-center space-x-2 group'
        variant='colorUnderline'
        title='Back'
        href={props.restoreUrl ?? '/'}
      >
        <MoveLeft size={18} className='transition group-hover:translate-x-1' />
        <span>{props.restoreText ?? 'Back to home'}</span>
      </CustomLink>
    </section>
  )
}
