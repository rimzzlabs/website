import { UnstyledLink } from '@/UI/links'

import { twclsx } from '@/libs'
import SOCIAL from '@/libs/constants/social'

import type { IconType } from 'react-icons/lib'
import { SiGithub, SiGmail, SiLinkedin, SiTelegram } from 'react-icons/si'

type SocialWithIcon = typeof SOCIAL[0] & { icon: IconType }

const icon = {
  email: SiGmail,
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
    <div className={twclsx('flex items-center space-x-3 md:space-x-4', props.className)}>
      {socialList.map((social) => {
        return (
          <UnstyledLink href={social.href} key={social.href}>
            <social.icon className={twclsx('w-5 h-5', props.iconStyle)} />
            <span className='sr-only'>{social.title}</span>
          </UnstyledLink>
        )
      })}
    </div>
  )
}
