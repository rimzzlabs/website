import { CustomTooltip } from '@/components/custom-tooltip'

import { useCopyClipboard } from '@/hooks/use-copy-clipboard'

import { tw } from '@/utils/tw'

import { CodeBlockLanguage } from './code-block-lang'

import { TbCheck, TbClipboard, TbLoader2 } from 'react-icons/tb'
import { match } from 'ts-pattern'

export const CodeBlockHeading = (props: { label: string; content?: string | null }) => {
  const [state, onClickCopy] = useCopyClipboard(props.content)

  return (
    <div
      className={tw(
        'h-10 px-4',
        'absolute top-0 inset-x-0',
        'flex items-center justify-between',
        'rounded-t-[0.3em] bg-base-50 dark:bg-base-950',
        'border-t border-x border-base-300 dark:border-base-900',
      )}
    >
      <CodeBlockLanguage label={props.label} />

      <button
        onClick={onClickCopy}
        className='tooltip-copy-code p-1.5 rounded-md transition hover:bg-base-200 dark:hover:bg-base-900'
      >
        <span className='sr-only'>Copy to clipboard</span>
        {match(state)
          .with({ isCopying: true, isCopied: false }, () => (
            <TbLoader2 className='animate-spin text-base-900 dark:text-[#F2ECFF]' />
          ))
          .with({ isCopied: true, isCopying: false }, () => (
            <TbCheck className='text-emerald-500 dark:text-[#00C896]' />
          ))
          .otherwise(() => (
            <TbClipboard className='text-base-900 dark:text-[#F2ECFF]' />
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
