import { links } from '@/utils/constant'
import { forwardRef } from 'react'
import NextLink from './NextLink'

const Footer = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <footer
      ref={ref}
      className='py-8 md:py-16 pb-8 border-t border-dark-300 dark:border-dark-600'>
      <h3 className='text-center'>Let&apos;s Connect!</h3>
      <div className='flex items-center justify-center my-2 md:my-4 mb-3 md:mb-6 space-x-2 md:space-x-3 xl:space-x-4'>
        {links.map((prop, idx) => (
          <NextLink
            href={prop.url}
            key={idx + prop.name}
            className='text-[1.35em] hover:text-primary-500 transition'>
            <prop.Icon />
          </NextLink>
        ))}
      </div>
      <p className='text-center text-xs md:text-sm'>
        © {new Date().getFullYear()} - Rizki Maulana Citra
      </p>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
