import type { HTTPGet } from '@/types/customType'

import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

const axios = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * a function that returns a promise that resolves to the data of projects or articles or even specific data depends on the endpoint passed
 * @param path path of the endpoint, `e.g. /projects or /articles`
 */
export const doGet: HTTPGet = async <T>(path: string) => {
  if (!path) throw new Error('path is not defined')
  try {
    const res = await axios.get<T>(path)
    return {
      result: res.data
    }
  } catch (error) {
    return {
      result: {
        data: [],
        meta: {}
      } as unknown as T
    }
  }
}
