import { CustomImage } from '@/UI/images'
import { UnderlineLink } from '@/UI/links'

import { twclsx } from '@/libs'

import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import { useMemo } from 'react'

type AuthorSectionProps = {
  name: string
  username: string
}

const imageV: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'anticipate' } }
}

const sentenceV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const letterV: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { ease: 'backIn', duration: 0.5 } }
}

const linkV: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { ease: 'anticipate', duration: 0.5 } }
}

const letter = 'Written by /'

export const AuthorSection: React.FunctionComponent<AuthorSectionProps> = (props) => {
  const githubAPI = useMemo(() => {
    return {
      picture: 'https://github.com/' + props.username + '.png',
      profile: 'https://github.com/' + props.username
    }
  }, [props.username])

  return (
    <section className={twclsx('flex flex-col', 'gap-4')}>
      <div className={twclsx('flex flex-col', 'gap-4')}>
        <div className={twclsx('flex items-center', 'gap-4')}>
          <m.figure variants={imageV}>
            <CustomImage
              display='intrinsic'
              className={twclsx('rounded-full')}
              src={githubAPI.picture}
              width={32}
              height={32}
              alt={props.name}
            />
          </m.figure>

          <m.p variants={sentenceV}>
            {letter.split('').map((c, i) => (
              <m.span variants={letterV} key={i}>
                {c}
              </m.span>
            ))}{' '}
            <m.span variants={linkV}>
              <UnderlineLink href={githubAPI.profile} title={props.name}>
                {props.name}
              </UnderlineLink>
            </m.span>
          </m.p>
        </div>
      </div>
    </section>
  )
}
