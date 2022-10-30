import { isProd } from '@/libs/constants/environmentState'

import Axios from 'axios'

const headers = { 'Content-Type': 'application/json' }

export const API_CLIENT = Axios.create({
  baseURL: isProd ? 'https://rizkicitra.dev' : 'http://localhost:3000',
  headers
})
