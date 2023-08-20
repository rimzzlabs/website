import { Skeleton } from '@/components/skeleton'

import { MainLayout } from '@/layouts'

export default function LoadingTagPage() {
  return (
    <MainLayout className='pt-16'>
      <Skeleton className='h-14 w-1/3 mb-3.5' />
      <Skeleton className='h-5 w-full mb-1' />
      <Skeleton className='h-5 w-2/3 mb-8' />

      <div className='flex flex-wrap gap-1 gap-y-1.5 mt-4 mb-8'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-6 w-24' />
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-6 w-44' />
        <Skeleton className='h-6 w-36' />
        <Skeleton className='h-6 w-52' />
        <Skeleton className='h-6 w-44' />
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-6 w-28' />
      </div>

      <Skeleton className='h-5 w-full mb-4' />

      <div>
        <Skeleton className='h-32 w-full mb-4 last-of-type:mb-8' />
        <Skeleton className='h-32 w-full mb-4 last-of-type:mb-8' />
        <Skeleton className='h-32 w-full mb-4 last-of-type:mb-8' />
        <Skeleton className='h-32 w-full mb-4 last-of-type:mb-8' />
      </div>
    </MainLayout>
  )
}
