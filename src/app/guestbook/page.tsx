import { MaintenancePage } from '@/components/maintenance'

import { createMetadata } from '@/domains/seo'

import { MainLayout } from '@/layouts'

export const metadata = createMetadata({
  title: 'Guestbook',
  description: 'Sign my guestbook, anything!',
})

export default function Page() {
  return (
    <MainLayout className='pt-16'>
      <MaintenancePage />
    </MainLayout>
  )
}
