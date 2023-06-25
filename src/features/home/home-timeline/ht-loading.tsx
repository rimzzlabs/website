export const HomeTimelineLoading = () => {
  const list = [1, 2, 3, 4]

  return (
    <ul className='flex flex-col'>
      {list.map((id) => (
        <div key={id} className='h-40 w-full'>
          <div className='h-8 w-full animate-pulse bg-base-100' />
          <div className='h-4 w-3/5 mt-2 mb-4 animate-pulse bg-base-100' />
          <div className='h-4 w-3/4 animate-pulse bg-base-100' />
        </div>
      ))}
    </ul>
  )
}
