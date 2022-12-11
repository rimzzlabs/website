import { WrappedImage } from '@/components/UI/images'

import { UnstyledLink } from '@/UI/links'

import { IconStack } from './IconStack'

import type { Portfolio } from 'rizkicitra'

export const PortfolioItem: React.FunctionComponent<Portfolio> = (props) => {
  const urlPortfolio = `/portfolio/${props.slug}`

  return (
    <div key={props.slug} className='flex flex-col'>
      <WrappedImage
        src={props.image}
        alt={props.title}
        className='w-full object-cover rounded-md'
        parentStyle='w-full h-44 rounded-md'
        loading='lazy'
        placeholder='blur'
        blurDataURL='/blur.svg'
        fill
      />
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
          <div className='flex items-center space-x-2.5 mt-1.5 mb-3'>
            {props.stack.map((stack) => (
              <IconStack type={stack} key={stack} />
            ))}
          </div>
        )}
        <p className='max-w-prose'>{props.summary}</p>
      </div>
    </div>
  )
}
