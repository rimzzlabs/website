import type { CustomSeoProps } from '@/components'

import { dateStringToISO } from '@/libs/intl'

import { generateOgImage } from './ogImage'
import { SITE_NAME, SITE_URL, TWITER_USERNAME } from './type'

import type { Blog } from 'rizkicitra'

export const getMetaPageBlog = (data: Blog): CustomSeoProps => ({
  title: data.title,
  description: data.summary,
  canonical: SITE_URL + data.slug,
  openGraph: {
    type: 'blog',
    article: { authors: [data.author_name], publishedTime: dateStringToISO(data.published), tags: data.topics },
    images: [
      {
        // TODDO: update your default thumbnail
        url: generateOgImage({ title: data.title, theme: 'dark' }),
        alt: data.title,
        width: 1200,
        height: 600
      }
    ],
    url: SITE_URL + data.slug,
    site_name: SITE_NAME
  },
  twitter: {
    cardType: 'summary_large_image',
    // TODO: Change to your Tiwitter username
    site: TWITER_USERNAME,
    handle: TWITER_USERNAME
  },
  additionalMetaTags: [
    {
      name: 'ARTICLE:PUBLISHED_TIME',
      content: dateStringToISO(data.published)
    },
    {
      name: 'ARTICLE:TAGS',
      content: data.topics.join(',')
    },
    {
      name: 'PUBLISH_DATE',
      content: dateStringToISO(data.published)
    },
    {
      name: 'keywords',
      content: data.keywords.join(',')
    },
    {
      name: 'author',
      content: data.author_name
    }
  ]
})
