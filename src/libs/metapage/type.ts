import type { CustomSeoProps } from '@/components'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME
export const TWITER_USERNAME = process.env.NEXT_PUBLIC_TWITTER_USERNAME

export type MetaPage = {
  title: string
  description: string
  keywords: Array<string>
  slug: string
  og_image: string
  og_image_alt: string
  type?: 'website' | 'blog'
} & CustomSeoProps
