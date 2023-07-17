'use client'

import { tw } from '@/utils/tw'

import { CodeBlockHeading } from './code-block-heading'

import { useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export const CodeBlock = ({ children, className }: Props) => {
  const label = className?.replace('language-', '') ?? 'bash'
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <div className='relative rounded-t-[.3em]'>
      <CodeBlockHeading label={label} content={preRef.current?.textContent} />
      <pre
        ref={preRef}
        className={tw(
          className,
          '!pt-11',
          '[&>code]:block',
          '[&>code]:border-none [&>code]:!bg-unset',
          '[&>code]:!px-0 [&>code]:!pb-0 [&>code]:min-w-min',
        )}
      >
        {children}
      </pre>
    </div>
  )
}
