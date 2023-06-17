import { tw } from '@/utils/tw'

import Link from 'next/link'
import type { IconType } from 'react-icons/lib'
import { SiGithub, SiLinkedin, SiMaildotru, SiTelegram } from 'react-icons/si'

const SOCIAL = [
  {
    title: 'Email',
    href: 'mailto: rmaulana.citra@gmail.com?subject=',
  },
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/rizkimcitra',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/rizkimcitra',
  },
  {
    title: 'Telegram',
    href: 'https://t.me/rizkimcitra',
  },
]

type SocialWithIcon = (typeof SOCIAL)[0] & { icon: IconType }

const icon = {
  email: SiMaildotru,
  linkedin: SiLinkedin,
  github: SiGithub,
  telegram: SiTelegram,
} as Record<string, IconType>

const socialList: SocialWithIcon[] = SOCIAL.map((social) => ({
  ...social,
  icon: icon[social.title.toLowerCase()],
}))

type SocialHomeProps = {
  className?: string
  iconStyle?: string
}

export const HomeHeroSocialMedia: React.FunctionComponent<SocialHomeProps> = (props) => {
  return (
    <div className={tw('flex items-center', props.className)}>
      <span className='text-sm sr-only'>connect with me:</span>
      {socialList.map((social) => {
        return (
          <Link
            className='inline-flex items-center justify-center w-7 h-7 mr-2.5 last-of-type:mr-0'
            href={social.href}
            key={social.href}
            title={`Connect with me on ${social.title}`}
          >
            <social.icon className={tw('w-5 h-5', props.iconStyle)} />
            <span className='sr-only'>Connect with Rizki M Citra on {social.title}</span>
          </Link>
        )
      })}
    </div>
  )
}
