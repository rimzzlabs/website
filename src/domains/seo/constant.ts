// export const SITE_OWNER = 'Rizki Maulana Citra'
// export const SITE_NAME = 'rizkicitra.dev'
// export const SITE_URL = 'https://rizkicitra.dev'

const siteOwner = process.env.NEXT_PUBLIC_SITE_OWNER
const siteOwnerRole = process.env.NEXT_PUBLIC_SITE_OWNER_ROLE
const siteName = process.env.NEXT_PUBLIC_SITE_NAME
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

if (!siteOwner || !siteName || !siteUrl || !siteOwnerRole) {
  throw new Error('Required environment variables are missing, check your environment variables!')
}

export const SITE_OWNER = siteOwner
export const SITE_NAME = siteName
export const SITE_URL = siteUrl
export const SITE_OWNER_ROLE = siteOwnerRole
