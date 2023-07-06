import { Code } from './code'
import { CodeBlock } from './code-block'
import { mdxHeading } from './heading'

import { MDXRemoteProps } from 'next-mdx-remote/rsc'

const MDXComponents = {
  pre: CodeBlock,
  code: Code,
  h2: mdxHeading('h2'),
  h3: mdxHeading('h3'),
  h4: mdxHeading('h4'),
  h5: mdxHeading('h5'),
  h6: mdxHeading('h6'),
} as MDXRemoteProps['components']

export { MDXComponents }
