import { CustomImage } from '@/UI/images'
import { UnderlineLink } from '@/UI/links'

import { twclsx } from '@/libs'

import { useMemo } from 'react'

type AuthorSectionProps = {
  name: string
  username: string
}

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
          <figure>
            <CustomImage
              display='intrinsic'
              className={twclsx('rounded-full')}
              src={githubAPI.picture}
              width={32}
              height={32}
              alt={props.name}
            />
          </figure>

          <p>
            Written by /{' '}
            <span>
              <UnderlineLink href={githubAPI.profile} title={props.name}>
                {props.name}
              </UnderlineLink>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
