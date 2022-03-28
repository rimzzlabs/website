import Blockquote from './Blockquote'
import Code from './Code'
import ContentImage from './ContentImage'
import ContentLink from './ContentLink'
import CustomPre from './Pre'

const MDXComponents = {
  pre: CustomPre,
  img: ContentImage,
  inlineCode: Code,
  blockquote: Blockquote,
  a: ContentLink
}

export default MDXComponents
