import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'

export type CustomSeoProps = {
  template?: string
} & NextSeoProps

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME

/**
 * It takes a NextSeoProps object and returns a `<NextSeo /> component`.
 */
export const CustomSeo: React.FunctionComponent<CustomSeoProps> = ({ ...props }) => {
  const TITLE_TEMPLATE = `%s — ${props.template ?? (SITE_NAME || 'rizkicitra.dev')}`
  return <NextSeo {...props} title={props.title} titleTemplate={TITLE_TEMPLATE} />
}
