import { NotFound } from '@/components/not-found'

export default function NotFoundTag() {
  return (
    <NotFound
      title='Tag not found'
      description="Oops ..., You've visited the unwritten blog post!"
      restoreUrl='/tag'
      restoreText='See all tags'
    />
  )
}
