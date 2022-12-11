import { WrappedImage } from '@/UI/images'
import { UnderlineLink } from '@/UI/links'

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
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <figure>
            <WrappedImage
              className='rounded-full'
              alt={props.name}
              src={githubAPI.picture}
              width={32}
              height={32}
              quality={100}
              priority
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
