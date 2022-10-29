import { isDev } from '@/libs/constants/environmentState'

import Axios from 'axios'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rizkicitra.dev'
const headers = { 'Content-Type': 'application/json' }

const umamiClient = Axios.create({
  baseURL: isDev ? '/' : SITE_URL,
  headers
})

export default umamiClient
