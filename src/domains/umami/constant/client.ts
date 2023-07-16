const scriptSrc = process.env.NEXT_PUBLIC_UMAMI_SRC
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

if (!scriptSrc || !websiteId) {
  throw new Error(
    'Required environment variables is missing at `src/domains/umami`.\nPlease add your umami environment variable, or remove `<ScriptUmami />` at `src/app/layout.tsx`',
  )
}

export const UMAMI_SRC = scriptSrc
export const UMAMI_WEBSITE_ID = websiteId
