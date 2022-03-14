import CustomImage from '@/components/atoms/CustomImage'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import UnderlineLink from '@/components/atoms/UnderlineLink'
import Blockquote from '@/components/mollecules/Blockquote'
import BlogImage from '@/components/mollecules/BlogImage'
import CustomCode from '@/components/mollecules/CustomCode'
import CustomPre from '@/components/mollecules/Pre'

const MDXComponents = {
  Link,
  Image,
  BlogImage,
  UnderlineLink,
  pre: CustomPre,
  inlineCode: CustomCode,
  blockquote: Blockquote,
  img: CustomImage
}

export default MDXComponents
