export type TGuestbook = {
  id: string
  message: string
  createdAt: string
  User?: {
    image?: string | null
    name?: string | null
    email?: string | null
  } | null
}

export type TGuestbookPayload = {
  message: string
}

export type TGuestbookResponse = {
  data: TGuestbook[]
  message: string
}
