import { UnstyledLink } from '@/UI/links'

import { twclsx } from '@/libs'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

const getHashURL = (asPath: string) => asPath.split('#')[1]
const isBrowser = typeof window !== 'undefined'

export const HeadingTwo: React.FunctionComponent<HeadingProps> = ({ id, ...props }) => {
  const [hashPath, setHasPath] = useState(false)
  const r = useRouter()

  useEffect(() => {
    if (isBrowser) {
      if (id === getHashURL(r.asPath)) {
        setHasPath(true)
      } else {
        setHasPath(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r.asPath])

  return (
    <h2 id={id} {...props}>
      <UnstyledLink
        title={id}
        href={`#${id}`}
        className={twclsx(
          'no-underline transition',
          'border-b border-dashed',
          'border-transparent hover:border-gray-500',
          hashPath && 'border-gray-500'
        )}
      >
        {props.children}
      </UnstyledLink>
    </h2>
  )
}

export const HeadingThree: React.FunctionComponent<HeadingProps> = ({ id, ...props }) => {
  const [hashPath, setHasPath] = useState(false)
  const r = useRouter()

  useEffect(() => {
    if (isBrowser) {
      if (id === getHashURL(r.asPath)) {
        setHasPath(true)
      } else {
        setHasPath(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r.asPath])

  return (
    <h3 id={id} {...props}>
      <UnstyledLink
        title={id}
        href={`#${id}`}
        className={twclsx(
          'no-underline transition',
          'border-b border-dashed',
          'border-transparent hover:border-gray-500',
          hashPath && 'border-gray-500'
        )}
      >
        {props.children}
      </UnstyledLink>
    </h3>
  )
}

export const HeadingFour: React.FunctionComponent<HeadingProps> = ({ id, ...props }) => {
  const [hashPath, setHasPath] = useState(false)
  const r = useRouter()

  useEffect(() => {
    if (isBrowser) {
      if (id === getHashURL(r.asPath)) {
        setHasPath(true)
      } else {
        setHasPath(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r.asPath])

  return (
    <h4 id={id} {...props}>
      <UnstyledLink
        title={id}
        href={`#${id}`}
        className={twclsx(
          'no-underline transition',
          'border-b border-dashed',
          'border-transparent hover:border-gray-500',
          hashPath && 'border-gray-500'
        )}
      >
        {props.children}
      </UnstyledLink>
    </h4>
  )
}
