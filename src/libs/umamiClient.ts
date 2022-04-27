import Axios from 'axios'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rizkicitra.dev'

const headers = { 'Content-Type': 'application/json' }

const umamiClient = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : SITE_URL,
  headers
})

export default umamiClient
