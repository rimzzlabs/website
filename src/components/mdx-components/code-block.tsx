'use client'

import { CustomTooltip } from '@/components/custom-tooltip'

import { useCopyClipboard } from '@/hooks/use-copy-clipboard'

import { tw } from '@/utils/tw'

import { useRef } from 'react'
import { SiJavascript } from 'react-icons/si'
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
        'rounded-t-[0.3em] bg-[#787586] ',
      )}
    >
      {match(props.label)
        .with('js', () => <SiJavascript size={18} className='text-[#F2ECFF] ' />)
        .otherwise((label) => {
          return <span className='text-[#F2ECFF] text-sm font-medium'>{label}</span>
        })}

      <button
        onClick={onClickCopy}
        className='tooltip-copy-code p-1.5 rounded-md transition hover:bg-[#5B666D]'
      >
        <span className='sr-only'>Copy to clipboard</span>
        {match(state)
          .with({ isCopying: true, isCopied: false }, () => (
            <TbLoader2 className='animate-spin text-[#F2ECFF]' />
          ))
          .with({ isCopied: true, isCopying: false }, () => <TbCheck className='text-[#00C896]' />)
          .otherwise(() => (
            <TbClipboard className='text-[#F2ECFF]' />
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
      <pre ref={preRef} className={tw(className, '[&>code]:border-none [&>code]:!bg-unset !pt-12')}>
        {children}
      </pre>
    </div>
  )
}
