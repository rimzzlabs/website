import { asyncFetchJSON } from '@/utils/async-fetch'
import { redis } from '@/utils/ssr'

import {
  REDIS_UMAMI_KEY,
  REDIS_UMAMI_KEY_EXPIRATION,
  UMAMI_DEPLOYED_URL,
  UMAMI_PASSWORD,
  UMAMI_USERNAME,
} from '../constant'

type AuthLoginResponse = {
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
    const [data, err] = await asyncFetchJSON<AuthLoginResponse>(
      UMAMI_DEPLOYED_URL + '/api/auth/login',
      {
        method: 'POST',
        data: {
          username: UMAMI_USERNAME,
          password: UMAMI_PASSWORD,
        },
      },
    )

    if (err) {
      return null
    }

    await redis.set(REDIS_UMAMI_KEY, data.token)
    await redis.expire(REDIS_UMAMI_KEY, REDIS_UMAMI_KEY_EXPIRATION)
    return data.token
  }

  return token
}
