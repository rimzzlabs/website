import UnderlineLink from '@/components/mollecules/UnderlineLink'

import Blockquote from './Blockquote'
import Code from './Code'
import ContentImage from './ContentImage'
import CustomPre from './Pre'

const MDXComponents = {
  pre: CustomPre,
  img: ContentImage,
  inlineCode: Code,
  blockquote: Blockquote,
  a: UnderlineLink
}

export default MDXComponents
