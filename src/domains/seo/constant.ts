const siteOwner = process.env.NEXT_PUBLIC_SITE_OWNER
const siteOwnerRole = process.env.NEXT_PUBLIC_SITE_OWNER_ROLE
const siteName = process.env.NEXT_PUBLIC_SITE_NAME
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const twitterUsername = process.env.NEXT_PUBLIC_TWITTER_USERNAME
const twitterId = process.env.NEXT_PUBLIC_TWITTER_ID

if (!siteOwner || !siteName || !siteUrl || !siteOwnerRole || !twitterId || !twitterUsername) {
  throw new Error('Required environment variables are missing, check your environment variables!')
}

export const SITE_OWNER = siteOwner
export const SITE_NAME = siteName
export const SITE_URL = siteUrl
export const SITE_OWNER_ROLE = siteOwnerRole
export const TWITTER = {
  id: twitterId,
  username: twitterUsername,
}
