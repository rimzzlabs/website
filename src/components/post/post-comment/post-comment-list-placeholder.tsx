import { CloudinaryImg } from '@/components/cloudinary-image'

export const PostCommentListPlaceholder = () => {
  return (
    <div className='flex flex-col items-center justify-center my-4'>
      <CloudinaryImg
        width={120}
        height={120}
        loading='lazy'
        alt='Image illustration'
        publicId='rizkicitra.dev/illustration/empty-state.svg'
        sizes='(min-width: 1px) 120, (min-width: 640px) 240px'
        title='Illustaton when there are no comments in this post'
      />
      <p className='text-sm mt-2'>Be the first to comment!</p>
    </div>
  )
}
