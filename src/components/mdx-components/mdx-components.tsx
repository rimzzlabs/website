import { CodeBlock } from './code-block'

import { MDXRemoteProps } from 'next-mdx-remote/rsc'

const MDXComponents = {
  pre: CodeBlock,
} as MDXRemoteProps['components']

export { MDXComponents }
