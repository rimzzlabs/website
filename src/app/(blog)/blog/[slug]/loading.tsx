import { Skeleton } from '@/components/skeleton'

import { tw } from '@/utils/tw'

export default function LoadingPage() {
  return (
    <section className='layout lg:max-w-5xl pt-10 xs:pt-16 '>
      <Skeleton className='w-5/6 h-12 mb-3' />
      <Skeleton className='w-2/3 h-12 mb-8' />

      <div
        className={tw('flex flex-col', 'space-y-2 mb-4', 'sm:flex-row sm:space-y-0 sm:space-x-6')}
      >
        <div className='flex space-x-2.5'>
          <Skeleton className='w-6 h-6' />
          <Skeleton className='w-40 h-6' />
        </div>

        <div className='flex space-x-2.5'>
          <Skeleton className='w-6 h-6' />
          <Skeleton className='w-40 h-6' />
        </div>
      </div>

      <div className='flex items-center space-x-1 mb-16'>
        <Skeleton className='w-20 h-6' />
        <Skeleton className='w-40 h-6' />
        <Skeleton className='w-32 h-6' />
      </div>

      <div className='lg:grid lg:grid-cols-[auto,20rem] lg:gap-7 2xl:gap-10'>
        <div className='flex flex-col w-full max-w-prose'>
          <Skeleton className='h-10 w-full mb-6' />
          <Skeleton className='h-4 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/3 mb-2' />
          <Skeleton className='h-4 w-11/12 mb-2' />
          <Skeleton className='h-4 w-3/4 mb-2' />
          <Skeleton className='h-4 w-2/5 mb-2' />

          <Skeleton className='h-8 w-9/12 my-6' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-8/12 mb-2' />
          <Skeleton className='h-4 w-10/12 mb-2' />
          <Skeleton className='h-4 w-8/12 mb-2' />
          <Skeleton className='h-4 w-9/12 mb-2' />
        </div>

        <div className='hidden w-full lg:flex lg:flex-col'>
          <Skeleton className='h-8 w-full mb-4' />
          <Skeleton className='w-3/4 h-4 mb-2' />
          <Skeleton className='w-1/3 h-4 mb-2' />
          <Skeleton className='w-11/12 h-4 mb-2' />
          <Skeleton className='w-9/12 h-4 mb-2' />
          <Skeleton className='w-full h-4 mb-2' />
          <Skeleton className='w-8/12 h-4 mb-2' />
          <Skeleton className='w-10/12 h-4' />
        </div>
      </div>
    </section>
  )
}
