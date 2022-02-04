import Image from '@/components/atoms/Image'

import portfolio from '@/data/portfolio'
import PageLayout from '@/layouts/PageLayout'

import clsx from 'clsx'
import { NextPage } from 'next'
import { IoGlobe, IoLogoGithub } from 'react-icons/io5'

const IndexPage: NextPage = () => {
  return (
    <PageLayout title='Home'>
      <div
        className={clsx(
          'flex flex-col',
          'md:flex-row-reverse md:justify-between md:items-center',
          'py-10 md:py-20 space-y-4 md:space-y-0'
        )}
      >
        <figure className={clsx('flex items-center md:justify-end self-start', 'w-full md:w-2/6', 'mb-4 md:mb-0')}>
          <Image
            width={140}
            height={140}
            layout='intrinsic'
            alt='Rizki Maulana Citra'
            className='rounded-full'
            src='https://ik.imagekit.io/rizkicitra/rizkicitra_dev/profile_ou7tfIev4.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1643735467105'
          />
        </figure>
        <section>
          <h1>Rizki M Citra</h1>
          <p
            className={clsx(
              'max-w-max mt-2 md:mt-4 mb-3 md:mb-6',
              'text-transparent font-bold text-lg md:text-xl',
              'bg-clip-text bg-gradient-to-r',
              'from-primary-500 to-ternary-500'
            )}
          >
            Frontend Developer
          </p>
          <p className='md:text-lg max-w-prose mb-2 md:mb-4'>
            Howdy👋, I&apos;m Rizki Maulana Citra, a Frontend Developer who loves to code, music, and drink coffee to
            fullfill his energy, talks about React, Next.js, JavaScript and CSS.
          </p>
        </section>
      </div>
      <section className={clsx('py-10 md:py-20')}>
        <h2 className={clsx('mb-4 md:mb-6')}>Portfolios</h2>

        <div className={clsx('grid flex-1 w-full', 'grid-cols-1 md:grid-cols-2', 'gap-4 md:gap-6')}>
          {portfolio.map((portf, index) => (
            <div key={portf.title + index} className={clsx('p-2 md:p-4', 'rounded border border-theme-700')}>
              {/* <figure className={clsx('relative', 'w-full aspect-video')}>
                <Image src={portf.src} alt={portf.title} className='rounded' objectFit='cover' />
              </figure> */}
              <h3>{portf.title}</h3>
              <p className={clsx('my-2 md:my-4')}>{portf.description}</p>

              <div className={clsx('flex items-center justify-end space-x-2 md:space-x-3')}>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={portf.url.github}
                  className={clsx('inline-flex items-center justify-center', 'text-xl md:text-2xl')}
                >
                  <IoLogoGithub />
                </a>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={portf.url.live}
                  className={clsx('inline-flex items-center justify-center', 'text-xl md:text-2xl')}
                >
                  <IoGlobe />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default IndexPage
