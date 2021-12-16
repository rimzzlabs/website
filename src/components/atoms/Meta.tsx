import { NextSeo } from 'next-seo'
import type { MetaType } from '@/types/customType'

/**
 * @description this component return a NextSeo props that has dynamic value depends on the props given
 * it has TITLE_TEMPLATE and SITE_NAME constant, customize to match your own
 */
const Meta = ({ title, description, imageURL, imageALT, url }: MetaType) => {
  const TITLE_TEMPLATE = 'Rizki Maulana Citra | Frontend Web Developer'
  const SITE_NAME = 'Rizki Maulana Citra'
  return (
    <NextSeo
      title={title}
      titleTemplate={`%s - ${TITLE_TEMPLATE}`}
      description={description}
      openGraph={{
        title,
        description,
        site_name: SITE_NAME,
        type: 'standalone',
        url: url || 'https://rizkicitra.my.id',
        images: [
          {
            url: imageURL || '',
            alt: imageALT || '',
            width: 600,
            height: 400
          }
        ]
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@rizkimcitra'
      }}
    />
  )
}

export default Meta
