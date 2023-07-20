import { tw } from '@/utils/tw'

import { createElement } from 'react'

type SkeletonProps = {
  className?: string
}

export const Skeleton = (props: SkeletonProps) => {
  return createElement<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>('div', {
    className: tw('rounded', 'bg-base-200 dark:bg-base-800', 'animate-pulse', props.className),
  })
}
