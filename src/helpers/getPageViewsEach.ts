import { Blogs } from '@/data/blog/blog.type'
import { GetBlogReturnValue } from '@/helpers/getBlog'

import readingTime from 'reading-time'

interface HTTP {
  status: boolean
  message: string
  data: number
}

const dev = process.env.NODE_ENV !== 'production'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

const baseURL = dev ? 'http://localhost:3000' : SITE_URL

const config = { headers: { 'Content-Type': 'application/json' } }

// a function that process each blog post and get pageviews value from umami
export const getPageViewsEach = async (blogs: Array<GetBlogReturnValue>): Promise<Array<Blogs>> => {
  require('isomorphic-fetch')
  // run promise all to each post, by passing an async map function to the Promise.all() method.

  return await Promise.all(
    // this would return an array of promises blog, so passing it to Promise.all() method like an array
    blogs.map(async (blog): Promise<Blogs> => {
      // do request to umami on each post by passing its slug to query parameter
      const response = await fetch(`${baseURL}/api/umami/blogviews?slug=${blog.header.slug}`, config)

      // set views, process request data to json, and set static type as HTTP, see line 9
      const views = (await response.json()) as HTTP

      // estimate reading time of the contents by using readingTime() function from reading-time library
      // but as soon as the function returned the value, grab the text value from the object
      const est_read = readingTime(blog.content).text

      // if response status are OK or 200, return the data with the value of views property from umami
      // otherwise return the data and set the views value property to 0
      return response.status === 200
        ? {
            views: views.data,
            est_read,
            ...blog.header
          }
        : {
            views: 0,
            est_read,
            ...blog.header
          }
    })
  )
}
