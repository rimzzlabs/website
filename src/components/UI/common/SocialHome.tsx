import { UnstyledLink } from '@/UI/links'

import { twclsx } from '@/libs'
import SOCIAL from '@/libs/constants/social'

import type { IconType } from 'react-icons/lib'
import { SiGithub, SiLinkedin, SiMaildotru, SiTelegram } from 'react-icons/si'

type SocialWithIcon = typeof SOCIAL[0] & { icon: IconType }

const icon = {
  email: SiMaildotru,
  linkedin: SiLinkedin,
  github: SiGithub,
  telegram: SiTelegram
} as Record<string, IconType>

const socialList: SocialWithIcon[] = SOCIAL.map((social) => ({
  ...social,
  icon: icon[social.title.toLowerCase()]
}))

type SocialHomeProps = {
  className?: string
  iconStyle?: string
}

export const SocialHome: React.FunctionComponent<SocialHomeProps> = (props) => {
  return (
    <div className={twclsx('flex items-center', props.className)}>
      <span className='text-sm sr-only'>connect with me:</span>
      {socialList.map((social) => {
        return (
          <UnstyledLink
            className='inline-flex items-center justify-center w-7 h-7 mr-2.5 last-of-type:mr-0'
            href={social.href}
            key={social.href}
            title={`Connect with me on ${social.title}`}
          >
            <social.icon className={twclsx('w-5 h-5', props.iconStyle)} />
            <span className='sr-only'>Connect with Rizki M Citra on {social.title}</span>
          </UnstyledLink>
        )
      })}
    </div>
  )
}
