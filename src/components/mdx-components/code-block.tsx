'use client'

import { CustomTooltip } from '@/components/custom-tooltip'

import { useCopyClipboard } from '@/hooks/use-copy-clipboard'

import { tw } from '@/utils/tw'

import { useRef } from 'react'
import { TbCheck, TbClipboard, TbLoader2 } from 'react-icons/tb'
import { match } from 'ts-pattern'

type Props = {
  children: React.ReactNode
  className?: string
}

const CodeBlockHeading = (props: { label: string; content?: string | null }) => {
  const [state, onClickCopy] = useCopyClipboard(props.content)

  return (
    <div
      className={tw(
        'h-10 px-4',
        'absolute top-0 inset-x-0',
        'flex items-center justify-between',
        'rounded-t-[0.3em] bg-[#45474B] ',
      )}
    >
      <span className='text-[#F9F871] text-sm font-medium'>{props.label}</span>

      <button
        onClick={onClickCopy}
        className='tooltip-copy-code p-1.5 rounded-md transition hover:bg-[#5B666D]'
      >
        <span className='sr-only'>Copy to clipboard</span>
        {match(state)
          .with({ isCopying: true, isCopied: false }, () => (
            <TbLoader2 className='animate-spin text-white' />
          ))
          .with({ isCopied: true, isCopying: false }, () => <TbCheck className='text-[#00C896]' />)
          .otherwise(() => (
            <TbClipboard className='text-white' />
          ))}
      </button>

      <CustomTooltip
        className='text-sm'
        anchorSelect='.tooltip-copy-code'
        content='Copy to Clipboard'
      />
    </div>
  )
}

export const CodeBlock = ({ children, className }: Props) => {
  const label = className?.replace('language-', '') ?? 'bash'
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <div className='relative'>
      <CodeBlockHeading label={label} content={preRef.current?.textContent} />
      <pre ref={preRef} className={tw(className, '[&>code]:border-none !pt-12')}>
        {children}
      </pre>
    </div>
  )
}
