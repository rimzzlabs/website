'use client'

import { MDXComponents } from '@/components/mdx-components'

import { useMDXComponent } from 'next-contentlayer/hooks'

export const PostMdx = (props: { body: string }) => {
  const Mdx = useMDXComponent(props.body)

  return <Mdx components={MDXComponents} />
}
