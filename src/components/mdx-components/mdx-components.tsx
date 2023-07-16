import { Anchor } from './anchor'
import { Code } from './code'
import { CodeBlock } from './code-block'
import { mdxHeading } from './heading'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { ImageProps } from 'next/image'
import Image from 'next/image'

const MDXComponents = {
  a: Anchor,
  pre: CodeBlock,
  code: Code,
  h2: mdxHeading('h2'),
  h3: mdxHeading('h3'),
  h4: mdxHeading('h4'),
  h5: mdxHeading('h5'),
  h6: mdxHeading('h6'),
  Image: (props: ImageProps) => {
    return <Image {...props} alt={props.alt} />
  },
} as MDXRemoteProps['components']

export { MDXComponents }
