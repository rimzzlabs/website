import { CustomSeoProps } from '@/components'

import { dateStringToISO } from './dateFormat'
import { generateOgImage } from './ogImage'

import { Blog } from 'rizkicitra'

type MetaData = {
  title: string
  description: string
  keywords: Array<string>
  slug: string
  og_image: string
  og_image_alt: string
  type?: 'website' | 'blog'
} & CustomSeoProps

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME
const TWITER_USERNAME = process.env.NEXT_PUBLIC_TWITTER_USERNAME

export const getMetaData = (data: MetaData): CustomSeoProps => ({
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
})

export const getMetaDataBlog = (data: Blog): CustomSeoProps => ({
  title: data.title,
  description: data.summary,
  canonical: SITE_URL + data.slug,
  openGraph: {
    type: 'blog',
    article: { authors: [data.author_name], publishedTime: dateStringToISO(data.published), tags: data.topics },
    images: [
      {
        // TODDO: update your default thumbnail at public/static/
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
    // TODO: Change to your Tiwetter username
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
