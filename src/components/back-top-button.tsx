'use client'

import { useWindowYAxis } from '@/hooks/use-win-y-axis'

import { tw } from '@/utils/tw'

import { CustomTooltip } from './custom-tooltip'

import { useCallback } from 'react'
import { TbArrowUp } from 'react-icons/tb'
import { P, match } from 'ts-pattern'

const MIN_Y_AXIS_TO_SHOW = 160 as const

const className = [
  'inline-flex',
  'p-2.5',
  'rounded-md',
  'bg-base-700',
  'text-white',
  'hover:bg-base-800',
]

export const BackTopButton = () => {
  const pos = useWindowYAxis()

  const onClickToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return match(pos)
    .with(P.number.gt(MIN_Y_AXIS_TO_SHOW), () => (
      <div className={tw('fixed bottom-4 right-4')}>
        <button data-tooltip-id='back-top-tooltip' onClick={onClickToTop} className={tw(className)}>
          <TbArrowUp />
          <span className='sr-only'>Back to top</span>
        </button>

        <CustomTooltip id='back-top-tooltip' content='Click to scroll to top' />
      </div>
    ))
    .otherwise(() => null)
}
