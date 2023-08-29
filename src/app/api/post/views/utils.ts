import { asyncFetchJSON } from '@/utils/async-fetch'
import { UMAMI_DEPLOYED_URL, UMAMI_PASSWORD, UMAMI_USERNAME } from '@/utils/env/server'

import type { TUmamiStatResponse, TUmamiAuthResponse } from '@/types/umami'

import { redis } from '@db/redis'

async function setRedisViews(slug: string, count: number) {
  try {
    return await redis.set(`page-views-${slug}`, count, 'EX', 60 * 60 * 24)
  } catch (error) {
    return 'NO'
  }
}
async function getRedisViews(slug: string) {
  try {
    const views = await redis.get(`page-views-${slug}`)
    if (!views) throw new Error('No post views')
    return parseInt(views)
  } catch (err) {
    return null
  }
}
async function setRedisToken(token: string) {
  try {
    return await redis.set('umami-token', token, 'EX', 60 * 60 * 24)
  } catch (error) {
    return 'NO'
  }
}
async function getRedisToken() {
  try {
    const token = await redis.get('umami-token')
    if (!token) throw new Error('No umami token')
    return token
  } catch (err) {
    return null
  }
}

async function getUmamiToken() {
  const [data, err] = await asyncFetchJSON<TUmamiAuthResponse>(
    UMAMI_DEPLOYED_URL + '/api/auth/login',
    {
      method: 'POST',
      data: {
        username: UMAMI_USERNAME,
        password: UMAMI_PASSWORD,
      },
    },
  )

  if (err) return null

  return data.token
}
async function getUmamiViews(payload: { token: string; slug: string }) {
  const firstDeployedUmami = 1645722000000
  const endDate = new Date().getTime()
  const postURL = `/blog/${payload.slug}`

  const url = new URL('api/website/1/stats', UMAMI_DEPLOYED_URL)
  url.searchParams.set('start_at', firstDeployedUmami.toString())
  url.searchParams.set('end_at', endDate.toString())
  url.searchParams.set('url', postURL)

  const [res, err] = await asyncFetchJSON<TUmamiStatResponse>(url.toString(), {
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  })

  if (err) return 0

  return res.pageviews.value
}

async function getToken() {
  const tokenFromRedis = await getRedisToken()
  if (!tokenFromRedis) {
    const token = await getUmamiToken()
    if (!token) return null
    await setRedisToken(token)
    return token
  }
  return tokenFromRedis
}

export async function getViews(slug: string) {
  try {
    const viewsFromRedis = await getRedisViews(slug)

    if (!viewsFromRedis) {
      const token = await getToken()

      if (!token) throw new Error('Cannot get token')

      const viewsFromUmami = await getUmamiViews({ token, slug })
      await setRedisViews(slug, viewsFromUmami)

      return [viewsFromUmami, null] as const
    }

    return [viewsFromRedis, null] as const
  } catch (error) {
    return [null, error as Error] as const
  }
}
