import { Skeleton } from '@/components/skeleton'

import { MainLayout } from '@/layouts'

export default function Loading() {
  return (
    <MainLayout>
      <div className='flex flex-col-reverse sm:flex-row md:items-center mb-10 mt-4'>
        <div className='sm:mr-6 w-full'>
          <Skeleton className='w-32 h-4 mb-2' />
          <Skeleton className='w-full max-w-xs h-6 mr-4 delay-75' />
        </div>

        <Skeleton className='w-28 mb-4 sm:mb-unset aspect-[.75/1] sm:flex-shrink-0 rounded-md delay-100' />
      </div>

      <div className='space-y-4'>
        <div className='space-y-1.5'>
          <Skeleton className='w-full h-4 delay-100' />
          <Skeleton className='w-11/12 h-4 delay-150' />
          <Skeleton className='w-10/12 h-4 delay-200' />
          <Skeleton className='w-11/12 h-4 delay-300' />
          <Skeleton className='w-full h-4 delay-300' />
          <Skeleton className='w-4/5 h-4 delay-300' />
        </div>

        <div className='space-y-1.5'>
          <Skeleton className='w-full h-4 delay-100' />
          <Skeleton className='w-11/12 h-4 delay-150' />
          <Skeleton className='w-10/12 h-4 delay-200' />
          <Skeleton className='w-11/12 h-4 delay-300' />
          <Skeleton className='w-full h-4 delay-300' />
          <Skeleton className='w-4/5 h-4 delay-300' />
        </div>
      </div>
    </MainLayout>
  )
}
