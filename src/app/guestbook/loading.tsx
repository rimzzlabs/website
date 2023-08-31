import { Skeleton } from '@/components/skeleton'

import { MainLayout } from '@/layouts'

export default function GuestbookLoadingPage() {
  return (
    <MainLayout>
      <Skeleton className='h-12 w-1/3 mb-8' />

      <div className='space-y-2 mb-8'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='h-4 w-4/5' />
      </div>

      <div className='space-y-3 mt-4'>
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
      </div>
    </MainLayout>
  )
}
