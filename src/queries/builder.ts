import { asyncFetchJSON } from '@/utils/async-fetch'

export type TBuildQuery = {
  url: string
  params?: Record<string, unknown>
}

const buildURL = (config: TBuildQuery) => {
  const url = new URL(config.url)
  Object.entries(config?.params ?? {}).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  return url.toString()
}

export const buildQuery = <TData>(config: TBuildQuery) => {
  const url = buildURL(config)

  return async () => {
    const [res, err] = await asyncFetchJSON<TData>(url, {
      method: 'GET',
    })

    if (err) throw err

    return res
  }
}

type TMutateQuery = TBuildQuery & {
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}
export const buildMutation = <TData, TPayload = unknown>(config: TMutateQuery) => {
  const url = buildURL(config)

  return async (payload: TPayload) => {
    const [res, err] = await asyncFetchJSON<TData>(url, {
      method: config.method,
      data: payload,
    })

    if (err) throw err

    return res
  }
}
