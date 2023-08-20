import { Post } from './content/def/post'

import { makeSource } from 'contentlayer/source-files'
import type { Options } from 'rehype-pretty-code'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

const rehypePrettyOptions: Options = {
  theme: 'one-dark-pro',
}

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, rehypePrettyOptions]],
    remarkPlugins: [remarkGfm],
  },
})
