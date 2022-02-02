import Image from '@/components/atoms/Image'
import Seo from '@/components/atoms/Seo'

import clsx from 'clsx'
import Link from 'next/link'

const IndexPage: React.FC = () => {
  return (
    <>
      <Seo title='Home' />
      <main>
        <div
          className={clsx(
            'flex flex-col',
            'md:flex-row-reverse md:justify-between md:items-center',
            'py-20 md:py-32 space-y-4 md:space-y-0'
          )}
        >
          <figure className={clsx('relative', 'w-32 md:w-56', 'aspect-square rounded-full overflow-hidden')}>
            <Image
              src='https://ik.imagekit.io/rizkicitra/rizkicitra_dev/profile_ou7tfIev4.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1643735467105'
              alt='Rizki Maulana Citra'
            />
          </figure>
          <section className={clsx('space-y-2 md:space-y-4')}>
            <h1>Rizki M Citra</h1>
            <p
              className={clsx(
                'max-w-max',
                'text-transparent font-bold md:text-lg',
                'bg-clip-text bg-gradient-to-r',
                'from-blue-500 to-sky-500'
              )}
            >
              Frontend Developer
            </p>
            <p className='md:text-lg max-w-prose'>
              Howdy👋, I&apos;m Rizki Maulana Citra, a Frontend Developer who loves to code, music, and drink coffee to
              fullfill his energy, talks about React, Next.js, JavaScript and CSS.
            </p>
            <div className={clsx('flex items-center', 'space-x-2 md:space-x-3')}>
              <Link href='#portfolio'>
                <a
                  className={clsx(
                    'inline-flex items-center justify-center',
                    'py-2 px-4 md:py-3 md:px-6',
                    'rounded',
                    'text-white bg-primary-600 dark:bg-primary-500'
                  )}
                >
                  Portolios
                </a>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default IndexPage
