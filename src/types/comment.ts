export type TSubComment = {
  id: string
  commentId: string
  body: string
  slug: string
  createdAt: string
  user: {
    name?: string | null
    image?: string | null
  }
}

export type TComment = {
  id: string
  body: string
  slug: string
  createdAt: string
  user: {
    name?: string | null
    image?: string | null
  }
  sub: TSubComment[]
}

export type TCommentResponse = {
  message: 'success' | 'failed'
  data: TComment[]
}

export type TCommentResponsePOST = {
  slug: string
  message: 'success' | 'failed'
}

export type TSubCommentMutationPayload = {
  type: 'subcomment'
  commentId: string
  body: string
  slug: string
}

export type TCommentMutationPayload = {
  slug: string
  body: string
  type: 'comment'
}

export type TMergedCommentMutationPayload = TSubCommentMutationPayload | TCommentMutationPayload
