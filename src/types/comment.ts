export type TComment = {
  id: string
  body: string
  slug: string
  createdAt: string
  user: {
    email?: string | null
    name?: string | null
    image?: string | null
  }
}

export type TCommentResponse = {
  message: 'success' | 'failed'
  data: TComment[]
}

export type TCommentMutationPayload = {
  slug: string
  body: string
}
