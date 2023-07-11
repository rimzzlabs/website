import { MaintenancePage } from '@/components/maintenance'

import { createMetadata } from '@/domains/seo'

import { MainLayout } from '@/layouts'

export const metadata = createMetadata({
  title: 'Project',
  description:
    'You can see a list of my side project while I am out of office or on a holiday to spend my time!',
})

export default function Page() {
  return (
    <MainLayout className='pt-16'>
      <MaintenancePage />
    </MainLayout>
  )
}
