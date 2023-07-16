import { asyncFetchJSON } from '@/utils/async-fetch'
import { redis } from '@/utils/ssr'

import { REDIS_UMAMI_KEY, UMAMI_DEPLOYED_URL, UMAMI_PASSWORD, UMAMI_USERNAME } from '../constant'

import { P, match } from 'ts-pattern'

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

  return await match(token)
    .with(P.nullish, async () => {
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
      console.info('fetch token run')

      await redis.set(REDIS_UMAMI_KEY, data.token)
      return data.token
    })
    .otherwise((token) => token)
}
