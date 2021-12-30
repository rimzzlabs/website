import { links } from '@/utils/constant'

import Dynamic from 'next/dynamic'

const NextLink = Dynamic(() => import('./NextLink'))

/**
 *  Footer is a component that used to render the footer of the website, it returns a JSX element.
 * wrapped with a forwardRef component from react, please dont't make change to any forwardRef as it's being
 * used by React to handle forwarding the refs on `src/pages/index.tsx`
 *
 */
const Footer = () => {
  return (
    <footer className='py-8 md:py-16 pb-8 border-t border-dark-300 dark:border-dark-600'>
      <h3 className='text-center'>Let&apos;s Connect!</h3>
      <div className='flex items-center justify-center my-2 md:my-4 mb-3 md:mb-6 space-x-1 md:space-x-2'>
        {links.map((prop, idx) => (
          <NextLink href={prop.url} key={idx + prop.name} className='p-1 md:p-2 hover:text-primary-500'>
            <prop.Icon className='text-[1.5em] md:text-[1.75em]' />
            <span className='sr-only'>{`Connect with Rizki on ${prop.name}`}</span>
          </NextLink>
        ))}
      </div>
      <p className='text-center text-xs md:text-sm'>© {new Date().getFullYear()} - Rizki Maulana Citra</p>
    </footer>
  )
}

export default Footer
