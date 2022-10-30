import { isProd } from '@/libs/constants/environmentState'

import Axios from 'axios'

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL

const headers = { 'Content-Type': 'application/json' }

export const UMAMI = Axios.create({
  baseURL: UMAMI_URL,
  headers
})

export const API_CLIENT = Axios.create({
  baseURL: isProd ? 'https://rizkicitra.dev' : 'http://localhost:3000',
  headers
})
