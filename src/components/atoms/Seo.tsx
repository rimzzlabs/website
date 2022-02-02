import { NextSeo, NextSeoProps } from 'next-seo'

/**
 * It takes a NextSeoProps object and returns a `NextSeo components`
 * @returns A Next.js component.
 */
const Seo: React.FC<NextSeoProps> = ({ ...props }) => {
  const TITLE_TEMPLATE = '%s | RizkiCitra'
  return <NextSeo {...props} title={props.title} titleTemplate={TITLE_TEMPLATE} />
}

export default Seo
