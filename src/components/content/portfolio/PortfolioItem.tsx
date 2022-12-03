import { UnstyledLink } from '@/UI/links'

import { IconStack } from './IconStack'

import Image from 'next/image'
import type { Portfolio } from 'rizkicitra'

export const PortfolioItem: React.FunctionComponent<Portfolio> = (props) => {
  const urlPortfolio = `/portfolio/${props.slug}`

  return (
    <div key={props.slug} className='flex flex-col'>
      <figure className='relative h-44 w-full overflow-hidden'>
        <Image
          fill
          src={props.image}
          alt={props.title}
          loading='lazy'
          placeholder='blur'
          blurDataURL='/blur.svg'
          className='object-cover rounded-md mb-3 md:mb-5'
        />
      </figure>

      <div className='mt-3'>
        <h3>
          <UnstyledLink
            href={urlPortfolio}
            className='border-b-2 border-dashed border-transparent hover:border-theme-500 dark:hover:border-theme-300'
          >
            {props.title}
          </UnstyledLink>
        </h3>
        {props.stack.length > 0 && (
          <div className='flex items-center space-x-2.5 mt-3 mb-2'>
            {props.stack.map((stack) => (
              <IconStack type={stack} key={stack} />
            ))}
          </div>
        )}
        <p className='col-span-2'>{props.summary}</p>
      </div>
    </div>
  )
}
