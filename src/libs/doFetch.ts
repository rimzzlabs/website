import Axios from 'axios'
import type {
  HTTPGetType,
  MetaStrapiType,
  ProjectType,
  SingleProjectType
} from '@/types/customType'

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
 * @param path path of the endpoint, `e.g. /projects or /articls`
 */
export const doGet: HTTPGetType = async (path) => {
  if (!path) throw new Error('Path is required!, \n example: /user/bla')
  try {
    const res = await axios.get(path)
    const data: ProjectType = res.data
    return {
      isError: false,
      result: data
    }
  } catch (error) {
    return {
      isError: true,
      result: {
        data: [] as SingleProjectType[],
        meta: {} as MetaStrapiType
      }
    }
  }
}
