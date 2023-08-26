import { useCopyClipboard } from '@/hooks/use-copy-clipboard'

import { tw } from '@/utils/common'

import { CheckIcon, CopyIcon, Loader2Icon } from 'lucide-react'
import { match } from 'ts-pattern'

export const CodeBlockCopy = (props: { text: string | null | undefined }) => {
  const [state, onClickCopy] = useCopyClipboard(props.text)

  return (
    <button
      onClick={onClickCopy}
      className={tw(
        'absolute top-1.5 right-3',
        'inline-flex items-center justify-center',
        'h-7 w-7 rounded-md transition hover:bg-base-700',
      )}
    >
      <span className='sr-only'>Copy to clipboard</span>
      {match(state)
        .with({ isCopying: true, isCopied: false }, () => (
          <Loader2Icon size='.875rem' className='animate-spin text-base-100' />
        ))
        .with({ isCopied: true, isCopying: false }, () => (
          <CheckIcon size='.875rem' className='text-emerald-500 dark:text-[#00C896]' />
        ))
        .otherwise(() => (
          <CopyIcon size='.875rem' className='text-base-100' />
        ))}
    </button>
  )
}
