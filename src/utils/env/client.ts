const scriptSrc = process.env.NEXT_PUBLIC_UMAMI_SRC
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const siteOwner = process.env.NEXT_PUBLIC_SITE_OWNER
const siteOwnerRole = process.env.NEXT_PUBLIC_SITE_OWNER_ROLE
const siteName = process.env.NEXT_PUBLIC_SITE_NAME
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const twitterUsername = process.env.NEXT_PUBLIC_TWITTER_USERNAME
const twitterId = process.env.NEXT_PUBLIC_TWITTER_ID

if (
  !scriptSrc ||
  !websiteId ||
  !siteOwner ||
  !siteName ||
  !siteUrl ||
  !siteOwnerRole ||
  !twitterId ||
  !twitterUsername
) {
  throw new Error(
    'Required environment variables are missing!\ncheck your environment variables at `src/utils/env/client.ts`',
  )
}

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3222' : siteUrl
export const SITE_OWNER = siteOwner
export const SITE_NAME = siteName
export const SITE_URL = siteUrl
export const SITE_OWNER_ROLE = siteOwnerRole
export const TWITTER_ID = twitterId
export const TWITTER_USERNAME = twitterUsername

export const UMAMI_SRC = scriptSrc
export const UMAMI_WEBSITE_ID = websiteId
