import { tw } from '@/utils/common'

import { CloudinaryImg } from './cloudinary-image'

type TProps = {
  message: string
  messageClassName?: string
  image?: { width: number; height: number }
}

export function Placeholder(props: TProps) {
  return (
    <div className='flex flex-col items-center justify-center my-4'>
      <CloudinaryImg
        width={props.image?.width ?? 120}
        height={props.image?.height ?? 120}
        loading='lazy'
        alt='Image illustration'
        publicId='rizkicitra.dev/illustration/empty-state.svg'
        sizes='(min-width: 1px) 120, (min-width: 640px) 240px'
        title='Illustaton when there are no comments in this post'
      />
      <p className={tw('text-sm mt-2', props.messageClassName)}>{props.message}</p>
    </div>
  )
}
