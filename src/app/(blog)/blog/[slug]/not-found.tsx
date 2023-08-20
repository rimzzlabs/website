import { NotFound } from '@/components/not-found'

export default function NotFoundPost() {
  return (
    <NotFound
      title='Post not found'
      description="Oops ..., You've visited the unwritten blog post!"
      restoreUrl='/blog'
      restoreText='See all posts'
    />
  )
}
