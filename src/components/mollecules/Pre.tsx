import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { HiCheckCircle, HiOutlineClipboardCopy } from 'react-icons/hi'

interface CustomPreProps {
  className: string
}

const CustomPre: React.FC<CustomPreProps> = (prop) => {
  const preEl = useRef<HTMLPreElement>(null)
  const language = prop.className.slice(9).toUpperCase()
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if ('navigator' in window) {
      if (preEl.current && preEl.current.children) {
        const text = preEl.current.children[0].textContent ?? ''
        const clipboard = navigator.clipboard

        clipboard.writeText(text)
        setIsCopied(true)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) setIsCopied(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isCopied])
  return (
    <div className='relative'>
      <div
        className={clsx(
          'flex items-center justify-between',
          'absolute inset-x-0 h-10 pl-2 pr-4',
          'rounded-t-lg top-0 left-0'
        )}
      >
        <div
          className={clsx(
            'font-medium',
            'border-x border-b rounded-b px-4 pb-2',
            'text-primary-500 dark:text-primary-400 border-primary-500 dark:border-primary-400 select-none'
          )}
        >
          {language}
        </div>
        <button
          onClick={handleCopy}
          title={isCopied ? 'copied to clipboard!' : 'copy code'}
          className={clsx(
            'p-1.5 md:p-2 mt-4 rounded border',
            'outline-none transition-all hover:ring',
            'text-theme-100 dark:text-theme-200',
            'ring-primary-500 dark:ring-primary-400 border-slate-600 ',
            'ring-offset-white dark:ring-offset-primary-300'
          )}
        >
          <span className='sr-only'>Copy Code</span>
          {!isCopied && <HiOutlineClipboardCopy />}
          {isCopied && <HiCheckCircle className='text-emerald-500' />}
        </button>
      </div>
      <pre
        ref={preEl}
        style={{
          paddingTop: '3rem'
        }}
        className={clsx(prop.className)}
      >
        {prop.children}
      </pre>
    </div>
  )
}

export default CustomPre
