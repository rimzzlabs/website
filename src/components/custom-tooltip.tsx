import { tw } from '@/utils/tw'

import { ITooltip, Tooltip } from 'react-tooltip'

type OmittedBaseProps = Omit<ITooltip, 'content'>

type CustomTooltipId = {
  id: string
  content: string
} & Omit<OmittedBaseProps, 'id'>

type CustomTooltipAnchorSelect = {
  anchorSelect: string
  content: string
} & Omit<OmittedBaseProps, 'anchorSelect'>

type CustomTooltipWithChildren = {
  content?: string
  children?: React.ReactNode
} & Omit<OmittedBaseProps, 'children'>

export type CustomTooltipProps =
  | CustomTooltipId
  | CustomTooltipAnchorSelect
  | CustomTooltipWithChildren

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
