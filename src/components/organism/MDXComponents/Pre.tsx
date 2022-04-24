import Button from '@/components/atoms/Button'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { HiCheck, HiClipboardCopy } from 'react-icons/hi'

interface PreProps {
  children: React.ReactNode
  className?: string
}

const Pre: React.FunctionComponent<PreProps> = ({ children, className }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const preRef = useRef<HTMLPreElement>(null)

  const copyToClipboard = async () => {
    if (preRef.current && !isCopied) {
      await navigator.clipboard.writeText(preRef.current.textContent as string)
      setIsCopied(true)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 1500)

    return () => clearTimeout(timer)
  }, [isCopied])

  return (
    <div className='relative'>
      <div
        className={clsx(
          'absolute left-0 right-12',
          'h-11 rounded-tl rounded-br',
          'font-semibold text-sm',
          'bg-slate-700 dark:bg-slate-800 text-main-1.5'
        )}
      >
        <div
          className={clsx(
            'inline-flex items-center justify-start',
            'px-4 md:px-8 h-full rounded-tl',
            'text-theme-100 bg-primary-600'
          )}
        >
          {className?.replace('language-', '').toUpperCase()}
        </div>
      </div>

      <div
        className={clsx(
          'absolute top-0 right-0',
          'flex items-center justify-center',
          'w-11 h-11 rounded-tr rounded-bl',
          'bg-slate-700 dark:bg-slate-800'
        )}
      >
        <Button
          onClick={copyToClipboard}
          className={clsx(
            'group relative',
            'w-8 h-8 rounded-lg transition-all duration-200',
            'ring-primary-400',
            'ring-offset-primary-400',
            'hover:ring'
          )}
        >
          {isCopied ? (
            <HiCheck className='w-4 h-4 text-emerald-500' />
          ) : (
            <HiClipboardCopy className='w-4 h-4 text-theme-100' />
          )}
          <span className='sr-only'>Copy to clipboard</span>
        </Button>
      </div>
      <pre ref={preRef} style={{ paddingTop: '3.5rem' }} className={className}>
        {children}
      </pre>
    </div>
  )
}

export default Pre
