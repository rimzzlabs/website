'use client'

import { tw } from '@/utils/tw'

import { useEffect, useMemo, useRef, useState } from 'react'
import { TbCheck, TbClipboard } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'
import { P, match } from 'ts-pattern'

type Props = {
  children: React.ReactNode
  className?: string
}

export const CodeBlock = ({ children, className }: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const preRef = useRef<HTMLPreElement>(null)

  const copyToClipboard = async () => {
    if (preRef.current && !isCopied) {
      await navigator.clipboard.writeText(preRef.current.textContent as string)
      setIsCopied(true)
    }
  }

  const tooltipContent = useMemo(() => {
    return match(isCopied)
      .with(
        P.when((b) => b === true),
        () => 'Copied to clipboard!',
      )
      .otherwise(() => 'Copy to clipboard')
  }, [isCopied])

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 1500)

    return () => clearTimeout(timer)
  }, [isCopied])

  return (
    <div className='relative'>
      <div
        className={tw(
          'absolute left-0 right-12',
          'h-11 rounded-tl rounded-br',
          'font-semibold text-sm',
          'bg-base-700',
        )}
      >
        <div
          className={tw(
            'inline-flex items-center justify-start',
            'px-4 md:px-8 h-full rounded-tl',
            'text-base-100 bg-primary-600',
          )}
        >
          {className?.replace('language-', '').toUpperCase()}
        </div>
      </div>

      <div
        className={tw(
          'absolute top-0 right-0',
          'flex items-center justify-center',
          'w-11 h-11 rounded-tr rounded-bl',
          'bg-base-700',
        )}
      >
        <button
          onClick={copyToClipboard}
          className={tw(
            'group copy-code relative',
            'flex items-center justify-center',
            'w-8 h-8 rounded-md',
            'hover:bg-base-800',
          )}
        >
          {isCopied ? (
            <TbCheck size={16} className='text-emerald-500' />
          ) : (
            <TbClipboard size={16} className='text-base-100' />
          )}
          <span className='sr-only'>Copy to clipboard</span>
        </button>

        <Tooltip anchorSelect='button.copy-code' content={tooltipContent} clickable />
      </div>

      <pre ref={preRef} className={tw('[&>code]:border-none pt-[3.5rem!important]', className)}>
        {children}
      </pre>
    </div>
  )
}
