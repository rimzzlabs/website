import buildUrl from 'cloudinary-build-url'
import Image from 'next/image'
import Link from 'next/link'

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
    <section className='flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)]'>
      <Image
        priority
        width={144}
        height={144}
        alt='Not Found Illustration'
        title='Not Found Illustration'
        src={src}
      />
      <h1 className='mt-6 mb-2 md:text-5xl'>404 | {props.title}</h1>
      <p>{props.description}</p>
      <Link href={props.restoreUrl ?? '/'}>{props?.restoreText ?? 'Back to home'}</Link>
    </section>
  )
}
