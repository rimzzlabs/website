import Axios from 'axios'

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL

const headers = { 'Content-Type': 'application/json' }

export const UMAMI = Axios.create({
  baseURL: UMAMI_URL,
  headers
})
