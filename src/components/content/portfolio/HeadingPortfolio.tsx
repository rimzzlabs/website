import { UnderlineLink } from '@/components/UI/links'

import { twclsx } from '@/libs'

import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import { HiGlobeAlt } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'

type HeadingPortfolioProps = {
  title: string
  summary: string
  link: { github: string; live: string }
}

const transition = { ease: 'anticipate', duration: 0.65 }

const toUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition }
}

const lineV: Variants = {
  hidden: { width: 0, opacity: 0.5 },
  visible: { width: '100%', opacity: 1, transition: { ...transition, duration: 2 } }
}

const sentenceV: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const letterV: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 1, transition: { ease: 'easeOut' } }
}

export const HeadingPortfolio: React.FunctionComponent<HeadingPortfolioProps> = (props) => {
  return (
    <section className={twclsx('pb-8')}>
      <m.h1 variants={sentenceV} className={twclsx('max-w-prose text-3xl md:text-5xl')}>
        {props.title.split('').map((c, i) => (
          <m.span variants={letterV} key={i}>
            {c}
          </m.span>
        ))}
      </m.h1>
      <m.p variants={toUp} className={twclsx('w-full my-8')}>
        {props.summary}
      </m.p>

      <m.div variants={toUp} className={twclsx('flex items-center', 'gap-4')}>
        <UnderlineLink
          href={props.link.github}
          className={twclsx('max-w-max', 'gap-2 py-1', 'text-theme-700 dark:text-theme-200')}
        >
          <SiGithub className={twclsx('text-lg md:text-xl', 'text-theme-800 dark:text-theme-200')} />
          <span className={twclsx('text-sm md:text-base')}>Repository</span>
        </UnderlineLink>

        {props.link.live && (
          <UnderlineLink href={props.link.live} className='max-w-max gap-2 py-1 text-theme-700 dark:text-theme-200'>
            <HiGlobeAlt className={twclsx('text-lg md:text-xl', 'text-theme-800 dark:text-theme-200')} />
            <span className={twclsx('text-sm md:text-base')}>Live Demo</span>
          </UnderlineLink>
        )}
      </m.div>

      <m.hr
        initial='hidden'
        animate='visible'
        variants={lineV}
        className={twclsx('mt-8 border-theme-300 dark:border-theme-700')}
      />
    </section>
  )
}
