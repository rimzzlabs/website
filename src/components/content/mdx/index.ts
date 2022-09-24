import { UnderlineLink } from '@/UI/links'

import { Blockquote } from './Blockquote'
import { Code } from './Code'
import { ContentImage } from './ContentImage'
import { Pre } from './Pre'

import { MDXRemoteProps } from 'next-mdx-remote'

const MDXComponents = {
  pre: Pre,
  img: ContentImage,
  code: Code,
  blockquote: Blockquote,
  a: UnderlineLink
} as MDXRemoteProps['components']

export { MDXComponents, Pre, Code, Blockquote, ContentImage }
