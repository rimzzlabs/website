import { twclsx } from '@/libs'

import type { UnstyledButtonProps } from './UnstyledButton'
import { UnstyledButton } from './UnstyledButton'

import { useCallback } from 'react'
import { HiArrowUp } from 'react-icons/hi'

export const ToTopButton: React.FunctionComponent<UnstyledButtonProps> = (props) => {
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  return (
    <UnstyledButton
      {...props}
      onClick={toTop}
      className={twclsx(
        'justify-start text-sm md:text-base',
        'space-x-1.5 py-1 max-w-max',
        'border-b-2 border-dashed',
        'border-theme-500',
        props.className
      )}
    >
      <HiArrowUp className='w-4 h-4' />
      <span>Back to top</span>
    </UnstyledButton>
  )
}
