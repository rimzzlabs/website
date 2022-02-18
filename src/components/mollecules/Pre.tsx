import clsx from 'clsx'
import { useRef } from 'react'

interface CustomCodeProps {
  className: string
}

const CustomCode: React.FC<CustomCodeProps> = (prop) => {
  const preEl = useRef<HTMLPreElement>(null)
  const language = prop.className.slice(9).toUpperCase()

  const handleCopy = () => {
    if ('navigator' in window) {
      if (preEl.current && preEl.current.children) {
        const text = preEl.current.children[0].textContent ?? ''
        const clipboard = navigator.clipboard

        clipboard.writeText(text)
      }
    }
  }
  return (
    <div className='relative'>
      <div
        className={clsx(
          'flex items-center justify-between',
          'absolute inset-x-0 h-10 px-4 md:px-8',
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
          title='copy'
          className={clsx(
            'p-1.5 md:p-2 mt-4 rounded border',
            'outline-none transition-all hover:ring',
            'ring-primary-500 dark:ring-primary-400 border-slate-600 ',
            'ring-offset-white dark:ring-offset-primary-300'
          )}
        >
          <span className='sr-only'>Copy Code</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-white'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
            <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
          </svg>
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

export default CustomCode
