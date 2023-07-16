import { CustomLink } from '@/components/custom-link'

import { P, match } from 'ts-pattern'

export const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = match(props.href)
    .with(P.nullish, () => '/')
    .otherwise((href) => href)

  return (
    <CustomLink {...props} title={props.title ?? 'A link about this article'} href={href}>
      {props.children}
    </CustomLink>
  )
}
