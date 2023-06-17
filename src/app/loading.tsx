import { CgSpinner } from 'react-icons/cg'

export default function Loading() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <CgSpinner size={56} className='animate-spin mb-3' />
      <p className='text-center'>Page loading, please wait...</p>
    </div>
  )
}
