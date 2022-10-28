import { UnderlineLink } from '@/components/UI/links'

import { twclsx } from '@/libs'

import { HiGlobeAlt } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'

type HeadingPortfolioProps = {
  title: string
  summary: string
  link: { github: string; live: string }
}

export const HeadingPortfolio: React.FunctionComponent<HeadingPortfolioProps> = (props) => {
  return (
    <section className={twclsx('pb-8')}>
      <h1 className={twclsx('max-w-prose text-3xl md:text-5xl')}>
        {props.title.split('').map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </h1>
      <p className={twclsx('w-full my-8')}>{props.summary}</p>

      <div className={twclsx('flex items-center', 'gap-4')}>
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
      </div>

      <hr className={twclsx('mt-8 border-theme-300 dark:border-theme-700')} />
    </section>
  )
}
