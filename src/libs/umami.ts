import Axios from 'axios'

const UMAMI_URL = process.env.UMAMI_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

const headers = { 'Content-Type': 'application/json' }

const umami = Axios.create({
  baseURL: UMAMI_URL,
  headers
})

export const umamiClient = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : SITE_URL,
  headers
})

export default umami
