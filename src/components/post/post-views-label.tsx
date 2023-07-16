import { compactNumber } from '@/utils/number'

import { TbEye } from 'react-icons/tb'
import { P, match } from 'ts-pattern'

type Props = {
  views: number
  iconSize?: number
}

export const PostViewsLabel = (props: Props) => {
  const word = match(props.views)
    .with(P.shape(0), () => "You're the first reader")
    .with(P.shape(1), (num) => `${compactNumber(num)} view`)
    .otherwise((num) => `${compactNumber(num)} views`)

  return (
    <span className='flex items-center'>
      <TbEye size={props?.iconSize ?? 14} />
      <span className='mx-1 text-sm'>{word}</span>
    </span>
  )
}
