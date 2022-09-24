import type { CustomSeoProps } from '@/components'

import { MetaPage, SITE_NAME, SITE_URL, TWITER_USERNAME } from './type'

export const getMetaPage = (data: MetaPage): CustomSeoProps => {
  return {
    canonical: SITE_URL + data.slug,
    openGraph: {
      images: [
        {
          url: data.og_image,
          alt: data.og_image_alt,
          width: 1200,
          height: 600
        }
      ],
      site_name: SITE_NAME,
      url: SITE_URL + data.slug,
      type: data.type ?? 'website'
    },
    twitter: {
      cardType: 'summary_large_image',
      // TODO: Change to your Tiwetter username
      site: TWITER_USERNAME,
      handle: TWITER_USERNAME
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: data.keywords.join(', ')
      }
    ],
    ...data
  }
}
