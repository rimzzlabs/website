import { CustomImage } from '@/UI/images'

import { twclsx } from '@/libs/twclsx'

export const EmptyResult: React.FunctionComponent = () => {
  return (
    <div className={twclsx('flex flex-col items-center justify-center')}>
      <CustomImage src='/static/not-found.svg' display='intrinsic' width={256} height={256} alt='Not found' />
      <p className='text-sm md:text-base mt-2.5 md:mt-4'>Unfortunately, I got nothing to show more😞.</p>
    </div>
  )
}
