import { Link } from '@/components/atoms/Link'

import clsx from 'clsx'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface PortfolioTemplateProps {
  mdxSource: MDXRemoteSerializeResult
}

const Portfolio: React.FC<PortfolioTemplateProps> = ({ mdxSource }) => {
  const component = {
    Link
  }
  return (
    <main className={clsx('prose', 'dark:prose-invert')}>
      <MDXRemote {...mdxSource} lazy components={component} />
    </main>
  )
}

export default Portfolio
