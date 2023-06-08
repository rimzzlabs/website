import { tw } from '@/utils/tw'

import Link from 'next/link'

type Props = {
  name: string
  href: string
}

export const NavbarItem = (props: Props) => {
  return (
    <Link href={props.href} className={tw('mr-2.5 last-of-type:mr-unset')}>
      {props.name}
    </Link>
  )
}
