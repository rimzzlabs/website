import { NextSeo, NextSeoProps } from 'next-seo'

export interface CustomSeoProps extends NextSeoProps {
  template?: string
}

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME

/**
 * It takes a NextSeoProps object and returns a `NextSeo components`
 * @returns A Next.js component.
 */
const Seo: React.FunctionComponent<CustomSeoProps> = ({ ...props }) => {
  const TITLE_TEMPLATE = `%s — ${props.template ?? SITE_NAME}`
  return <NextSeo {...props} title={props.title} titleTemplate={TITLE_TEMPLATE} />
}

export default Seo
