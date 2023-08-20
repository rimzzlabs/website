import { getReadingTime, getSlug } from '../util'

import { defineDocumentType } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    description: { type: 'string', required: true },
    status: { type: 'enum', options: ['draft', 'ready'], required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    keywords: { type: 'list', of: { type: 'string' }, required: true },
    recommendations: { type: 'string' },
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: (post) => getReadingTime(post),
    },
    slug: {
      type: 'string',
      resolve: (post) => getSlug(post),
    },
  },
}))
