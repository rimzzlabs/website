import UnstyledLink from '@/components/atoms/UnstyledLink'

import useDrawer from '@/hooks/useDrawer'
import APP_ROUTE from '@/libs/constants/route'

import clsx from 'clsx'
import { Variants, m } from 'framer-motion'
import { useRouter } from 'next/router'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, ease: 'easeOut' } }
}

const item: Variants = {
  hidden: {
    ...container.hidden,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: 'easeOut'
    }
  }
}

const Drawer = () => {
  const { changeState } = useDrawer()
  const { pathname } = useRouter()

  return (
    <aside
      aria-labelledby='toggle-drawer'
      className={clsx(
        'fixed left-0 bottom-0 top-20 z-40',
        'w-screen h-screen backdrop-blur',
        'bg-theme-50 dark:bg-theme-900',
        'md:hidden'
      )}
    >
      <nav className='layout flex flex-col'>
        <m.ul variants={container} initial='hidden' animate='visible'>
          {APP_ROUTE.map((prop, id) => (
            <m.li key={id} variants={item}>
              <UnstyledLink
                key={id}
                href={prop.path}
                onClick={changeState}
                className={clsx(
                  'inline-flex text-left w-full',
                  'py-4 border-b-2 font-semibold',
                  pathname === prop.path
                    ? 'text-theme-800 dark:text-theme-200 border-primary-500 dark:border-primary-400'
                    : 'text-theme-600 dark:text-theme-400 border-theme-300 dark:border-theme-700'
                )}
              >
                {prop.name}
              </UnstyledLink>
            </m.li>
          ))}
        </m.ul>
      </nav>
    </aside>
  )
}

export default Drawer
