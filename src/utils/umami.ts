import { REDIS_UMAMI_KEY, REDIS_UMAMI_KEY_EXPIRATION } from '@/constants/umami'

import { asyncFetchJSON } from './async-fetch'
import { UMAMI_DEPLOYED_URL, UMAMI_PASSWORD, UMAMI_USERNAME } from './env/server'

import { redis } from '@db/redis'

type AuthResponse = {
  token: string
  user: {
    id: string
    username: string
    createdAt: string
  }
}

export const getUmamiToken = async () => {
  const token = await redis.get(REDIS_UMAMI_KEY)

  if (!token) {
    const [data, err] = await asyncFetchJSON<AuthResponse>(UMAMI_DEPLOYED_URL + '/api/auth/login', {
      method: 'POST',
      data: {
        username: UMAMI_USERNAME,
        password: UMAMI_PASSWORD,
      },
    })

    if (err) {
      return null
    }

    await redis.set(REDIS_UMAMI_KEY, data.token)
    await redis.expire(REDIS_UMAMI_KEY, REDIS_UMAMI_KEY_EXPIRATION)
    return data.token
  }

  return token
}
