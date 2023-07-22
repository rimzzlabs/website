import { CustomLink } from '@/components/custom-link'

import { P, match } from 'ts-pattern'

export const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = match(props.href)
    .with(P.nullish, () => '/')
    .otherwise((href) => href)

  return (
    <CustomLink
      {...props}
      href={href}
      variant='color'
      title={props.title ?? 'A link about this post'}
      target='_blank'
      rel='noopener noreferrer'
    >
      {props.children}
    </CustomLink>
  )
}
