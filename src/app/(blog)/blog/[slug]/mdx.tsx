'use client'

import { MDXComponents } from '@/components/mdx-components'

import { useMDXComponent } from 'next-contentlayer/hooks'

export const MDX = (props: { body: string }) => {
  const Component = useMDXComponent(props.body)

  return <Component components={MDXComponents} />
}
