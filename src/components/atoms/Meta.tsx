import type { MetaType } from '@/types/customType'

import { NextSeo } from 'next-seo'

/**
 * @description this component return a NextSeo props that has dynamic value depends on the props given
 * it has TITLE_TEMPLATE and SITE_NAME constant, customize to match your own
 * @param title - the title of the page, this props is required
 * @param description - the description of the page, this props is required
 * @param url - the url of the page, this props is required
 * @param image - the image of the page, this props is required
 * @param keywords - the keywords of the page, this props is not required
 */
const Meta = ({ title, description, imageURL, imageALT, url, keywords }: MetaType) => {
  const TITLE_TEMPLATE = 'Rizki Maulana Citra | Frontend Web Developer'
  const SITE_NAME = 'Rizki Maulana Citra'
  let defaultKeywords = `Rizki, Rizki Maulana Citra, Rizki Citra, Rizkicitra, rizkicitra, rizkimcitra Frontend Developer, Frontend Web Developer, `
  if (keywords) {
    defaultKeywords += keywords
  }

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
      additionalMetaTags={[
        {
          name: 'keywords',
          content: defaultKeywords
        }
      ]}
    />
  )
}

export default Meta
