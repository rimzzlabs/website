import { tw } from '@/utils/tw'

import { AtomComments } from './store'

import { useSetAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { P, match } from 'ts-pattern'

type SubmitParam = {
  name: string
  comment: string
}

type ReturnSubmitPost = {
  date: string
  from: string
  text: string
}
const submitPost = <T extends SubmitParam>(value: T) => {
  return new Promise<ReturnSubmitPost>((resolve) => {
    const timer = Math.floor(Math.random() * 10000)

    setTimeout(() => {
      resolve({
        date: new Date().toISOString(),
        from: value.name,
        text: value.comment,
      })
    }, timer)
  })
}

export const BlogPostCommentForm = () => {
  const setComments = useSetAtom(AtomComments)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState({
    name: '',
    comment: '',
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof typeof value
    setValue((value) => ({ ...value, [id]: e.target.value }))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const data = await submitPost(value)

    setComments((prev) => [...prev, data])
    setValue({ comment: '', name: '' })
    setIsLoading(false)
  }

  const submitChildren = match(isLoading)
    .with(P.shape(true), () => 'Loading ...')
    .with(P.shape(false), () => 'Submit')
    .exhaustive()

  return (
    <form className='my-4 lg:mb-unset' onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-2'>
        <label className='flex-grow-0' htmlFor='name'>
          Name
        </label>

        <input
          required
          id='name'
          name='name'
          type='text'
          placeholder='Your name'
          disabled={isLoading}
          value={value.name}
          onChange={handleChange}
          className={tw(
            'p-2 rounded-md border',
            'outline-none transition',
            'focus:ring-1 text-sm placeholder:text-sm',
            'bg-base-100 dark:bg-base-900',
            'border-base-300 dark:border-base-700',
            'ring-base-400 dark:ring-base-600',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          )}
        />
      </div>

      <div className='flex flex-col space-y-2 mt-4'>
        <label className='flex-grow-0' htmlFor='comment'>
          Comment
        </label>

        <input
          required
          id='comment'
          name='comment'
          type='text'
          placeholder='What do you think about this one?'
          disabled={isLoading}
          value={value.comment}
          onChange={handleChange}
          className={tw(
            'p-2 rounded-md border',
            'outline-none transition',
            'focus:ring-1 text-sm placeholder:text-sm',
            'bg-base-100 dark:bg-base-900',
            'border-base-300 dark:border-base-700',
            'ring-base-400 dark:ring-base-600',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          )}
        />
      </div>

      <button
        disabled={isLoading}
        type='submit'
        className='inline-block py-2 px-4 mt-4 rounded-md transition disabled:opacity-60 bg-primary-500 text-white hover:bg-primary-600 disabled:hover:bg-primary-500'
      >
        {submitChildren}
      </button>
    </form>
  )
}
