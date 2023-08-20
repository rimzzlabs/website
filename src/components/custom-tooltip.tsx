import { tw } from '@/utils/tw'

import type { ITooltip } from 'react-tooltip'
import { Tooltip } from 'react-tooltip'

type TProps = Omit<ITooltip, 'content' | 'anchorSelect' | 'children' | 'id'>

type TTooltipWithId =
  | (TProps & {
      id: string
      content: string
    })
  | (TProps & {
      id: string
      children: React.ReactNode
    })

type TooltipWithAnchor =
  | (TProps & {
      anchorSelect: string
      content: string
    })
  | (TProps & {
      anchorSelect: string
      children: React.ReactNode
    })

export type CustomTooltipProps = TooltipWithAnchor | TTooltipWithId

export const CustomTooltip = (props: CustomTooltipProps) => {
  return (
    <Tooltip
      {...props}
      className={tw(
        'max-w-xs !opacity-100 bg-base-600 dark:bg-base-800 z-[9999999]',
        props.className,
      )}
    />
  )
}
