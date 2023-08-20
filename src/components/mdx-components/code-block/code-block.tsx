'use client'

import { tw } from '@/utils/tw'

import { CodeBlockCopy } from './code-block-copy'

import { useRef } from 'react'

type CodeBlockProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>

export const CodeBlock = (props: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <div className='not-prose'>
      <CodeBlockCopy text={preRef?.current?.textContent} />
      <pre
        {...props}
        ref={preRef}
        className={tw(
          'not-prose',
          '[&>code]:block',
          '[&>code]:border-none [&>code]:!bg-unset',
          '[&>code]:!p-0 [&>code]:min-w-min',
        )}
      >
        {props.children}
      </pre>
    </div>
  )

  // return (
  //   <div className='relative rounded-t-[.3em]'>
  //     {/* <CodeBlockHeading label={label} content={preRef.current?.textContent} /> */}
  //     <pre
  //       {...props}
  //       ref={preRef}
  //       className={tw(
  //         className,
  //         '!pt-11',
  //         '[&>code]:block',
  //         '[&>code]:border-none [&>code]:!bg-unset',
  //         '[&>code]:!px-0 [&>code]:!pb-0 [&>code]:min-w-min',
  //       )}
  //     >
  //       {children}
  //     </pre>
  //   </div>
  // )
}
