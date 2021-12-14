import { HTTPGetType, ProjectType } from '@/types/customType'
import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

const axios = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const doGet: HTTPGetType = async (path) => {
  if (!path) throw new Error('Path is required!, \n example: /user/bla')
  try {
    const res = await axios.get(path)
    const data: ProjectType = res.data
    return {
      isError: false,
      data
    }
  } catch (error) {
    return {
      isError: true,
      data: {} as ProjectType
    }
  }
}
