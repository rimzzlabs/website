import { NextSeo, NextSeoProps } from 'next-seo'

export interface SeoProp extends NextSeoProps {
  templateTitle?: string
}
/**
 * It takes a NextSeoProps object and returns a `NextSeo components`
 * @returns A Next.js component.
 */
const Seo: React.FC<SeoProp> = ({ ...props }) => {
  const TITLE_TEMPLATE = `%s - ${props.templateTitle ?? 'Student and Frontend Developer from Indonesia'}`
  return <NextSeo {...props} title={props.title} titleTemplate={TITLE_TEMPLATE} />
}

export default Seo
