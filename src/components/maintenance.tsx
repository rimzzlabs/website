import { CloudinaryImg } from './cloudinary-image'
import { ColorLink } from './link/color'

import { TbArrowLeft } from 'react-icons/tb'

export const MaintenancePage = () => {
  return (
    <section className='text-center'>
      <CloudinaryImg
        publicId='/rizkicitra.dev/illustration/maintenance.svg'
        title='Page maintenance'
        alt='Page maintenance'
        width={187}
        height={187}
        className='mx-auto'
      />
      <h1 className='title mb-8 mt-4'>Page still on development</h1>
      <p className='max-w-prose mx-auto mb-4'>
        This page is being developed, you might check back later. meanwhile you can checkout my
        other pages that is available, thank you.
      </p>

      <ColorLink flex className='space-x-1 max-w-max mx-auto group' title='Back to home' href='/'>
        <TbArrowLeft className='group-hover:-translate-x-2 transition' />
        <span>to home</span>
      </ColorLink>
    </section>
  )
}
