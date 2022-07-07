import UnderlineLink from '@/components/mollecules/UnderlineLink'

import Blockquote from './Blockquote'
import Code from './Code'
import ContentImage from './ContentImage'
import CustomPre from './Pre'

import { MDXRemoteProps } from 'next-mdx-remote'

const MDXComponents = {
  pre: CustomPre,
  img: ContentImage,
  code: Code,
  blockquote: Blockquote,
  a: UnderlineLink
} as MDXRemoteProps['components']

export default MDXComponents
