import { CustomImage } from '@/UI/images'

import { twclsx } from '@/libs/twclsx'

export const EmptyResult: React.FunctionComponent = () => {
  return (
    <div className={twclsx('flex flex-col items-center justify-center py-8 md:py-16')}>
      <CustomImage src='/static/not-found.svg' display='intrinsic' width={256} height={256} alt='Not found' />
      <p className='text-sm md:text-base mt-2.5 md:mt-4'>
        Couldn&apos;t find what you&apos;re looking for, come back later for further content!.
      </p>
    </div>
  )
}
