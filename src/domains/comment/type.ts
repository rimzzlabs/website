export type SubComment = {
  id: number
  uuid: string
  slug: string
  created_at: Date
  updated_at?: Date
  user_email: string
  user_name: string
  user_image: string
  body: string
  comment_uuid: string
}

export type Comment = {
  id: number
  uuid: string
  slug: string
  created_at: Date
  updated_at?: Date
  user_email: string
  user_name: string
  user_image: string
  body: string
  subs?: SubComment[]
}
