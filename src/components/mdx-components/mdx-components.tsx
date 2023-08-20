import { Anchor } from './anchor'
import { Blockquote } from './blockquote'
import { Code } from './code'
import { CodeBlock } from './code-block'
import { mdxHeading } from './heading'

import type { ImageProps } from 'next/image'
import Image from 'next/image'

const MDXComponents = {
  a: Anchor,
  code: Code,
  pre: CodeBlock,
  blockquote: Blockquote,
  h2: mdxHeading('h2'),
  h3: mdxHeading('h3'),
  h4: mdxHeading('h4'),
  h5: mdxHeading('h5'),
  h6: mdxHeading('h6'),
  Image: (props: ImageProps) => {
    return <Image {...props} alt={props.alt} />
  },
}

export { MDXComponents }
