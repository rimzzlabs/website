import { UnstyledLink } from '@/UI/links'

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

export const SocialHome: React.FunctionComponent = () => {
  return (
    <div className='flex items-center space-x-3 md:space-x-4'>
      {socialList.map((social) => {
        return (
          <UnstyledLink href={social.href} key={social.href}>
            <social.icon className='w-5 h-5' />
            <span className='sr-only'>{social.title}</span>
          </UnstyledLink>
        )
      })}
    </div>
  )
}
