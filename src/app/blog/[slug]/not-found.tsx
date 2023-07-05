import { tw } from '@/utils/tw'

import buildUrl from 'cloudinary-build-url'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPost() {
  const src = buildUrl('rizkicitra.dev/not-found-illustration.svg', {
    cloud: {
      cloudName: 'rizkicitra',
    },
  })

  return (
    <section
      className={tw('flex flex-col', 'items-center justify-center', 'w-full h-[calc(100vh-4rem)]')}
    >
      <Image
        priority
        width={144}
        height={144}
        alt='Not Found Illustration'
        title='Not Found Illustration'
        src={src}
      />
      <h1 className='mt-6 mb-2 md:text-5xl'>404 | Post Not Found</h1>
      <p>Oops, you&apos;ve visited the unwritten post!</p>
      <Link href='/'>Back to post list</Link>
    </section>
  )
}
