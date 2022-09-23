import { isDev } from '@/libs/constants/environmentState'
import umami from '@/libs/umami'
import { getToken } from '@/services'
import type { GetContents } from '@/services'

import readingTime from 'reading-time'
import type { Blog, PageView } from 'rizkicitra'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const baseURL = isDev ? 'http://localhost:3000' : SITE_URL

type GetPageViews = {
  isError: boolean
  data: number | null
}

/**
 * It takes an array of objects, and returns the sum of the values of the `pageviews` property of each
 * object
 * @param arr - Array<PageView> - the array of pageviews
 */
const reducePageViewsToNumber = (arr: Array<PageView>) => {
  return arr.reduce((acc, curVal) => {
    const newVal = acc.pageviews.value + curVal.pageviews.value

    acc.pageviews.value = newVal
    return acc
  }).pageviews.value
}

/**
 * It takes a slug, gets a token, then makes two requests to the Umami API, one for the article and one
 * for the blog, and then merges the data and returns it
 * @param {string} slug - string - the slug of the article or blog post
 * @returns An object with two properties: isError and data.
 */
export const getPageViews = async (slug: string): Promise<GetPageViews> => {
  const end_date = new Date()

  const token = await getToken()
  if (!token) {
    return { isError: true, data: null }
  }

  const config = { headers: { Authorization: `Bearer ${token}` } }

  const articleURL = `/api/website/1/stats?start_at=${1645722000000}&end_at=${end_date.getTime()}&url=/article/${slug}`
  const blogURL = `/api/website/1/stats?start_at=${1645722000000}&end_at=${end_date.getTime()}&url=/blog/${slug}`

  let responseArticle = {
    bounces: { change: 0, value: 0 },
    pageviews: { change: 0, value: 0 },
    totaltime: { change: 0, value: 0 },
    unique: { change: 0, value: 0 }
  } as PageView

  let responseBlog = {
    bounces: { change: 0, value: 0 },
    pageviews: { change: 0, value: 0 },
    totaltime: { change: 0, value: 0 },
    unique: { change: 0, value: 0 }
  } as PageView

  /* Making two requests to the Umami API, one for the article and one for the blog, and then merges the
 data and returns it */
  const res = await Promise.allSettled([umami.get<PageView>(articleURL, config), umami.get<PageView>(blogURL, config)])

  /* Checking if the first request was successful, and if it was, it is assigning the data to the
  responseArticle variable. */
  if (res[0].status === 'fulfilled') {
    responseArticle = res[0].value.data
  }

  /* Checking if the second request was successful, and if it was, it is assigning the data to the
    responseBlog variable. */
  if (res[1].status === 'fulfilled') {
    responseBlog = res[1].value.data
  }

  /* Taking the two objects, responseArticle and responseBlog, and putting them into an array, and then
  using the Object.values() method to return an array of the values of the objects. */
  const mergedResponseData = Object.values([responseArticle, responseBlog])

  const data = reducePageViewsToNumber(mergedResponseData)

  return {
    isError: false,
    data
  }
}

// a function that process each blog post and get pageviews value from umami
export const getPageViewsEach = async (blogs: Array<GetContents<Blog>>): Promise<Array<Blog>> => {
  require('isomorphic-fetch')
  const requests = blogs.map(async (blog): Promise<Blog> => {
    // this would return an array of promises blog, so passing it to Promise.all() method like an array
    // do request to umami on each post by passing its slug to query parameter
    const response = await umami.get(`${baseURL}/api/umami/blogviews?slug=${blog.header.slug}`)

    // set views, process request data to json, and set static type as HTTP, see line 9
    const views = response.data as number

    // estimate reading time of the contents by using readingTime() function from reading-time library
    // but as soon as the function returned the value, grab the text value from the object
    const est_read = readingTime(blog.content).text

    // if response status are OK or 200, return the data with the value of views property from umami
    if (response.status !== 200) {
      return {
        views: 0,
        est_read,
        ...blog.header
      }
    }

    // otherwise return the data and set the views value property to 0
    return {
      views,
      est_read,
      ...blog.header
    }
  })
  // run promise all to each post, by passing an async map function to the Promise.all() method.

  return await Promise.all(requests)
}
