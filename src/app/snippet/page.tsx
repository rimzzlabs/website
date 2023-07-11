import { MaintenancePage } from '@/components/maintenance'

import { createMetadata } from '@/domains/seo'

import { MainLayout } from '@/layouts'

export const metadata = createMetadata({
  title: 'Snippet',
  description:
    'List of my snippet. I sometimes create a snippet to store my code that might be reusable on repeated case.',
})

export default function Page() {
  return (
    <MainLayout className='pt-16'>
      <MaintenancePage />
    </MainLayout>
  )
}
