import { responseJSON } from '@/utils/response-json'

export function unauthorized<TData>(data?: TData) {
  const initialResponse = { message: 'Unauthorized!' }

  if (!data) return responseJSON(initialResponse, 401)
  return responseJSON({ ...initialResponse, ...data }, 401)
}

export function badRequest<TData>(data?: TData) {
  return responseJSON(data, 400)
}

export function responseOK<TData>(data: TData) {
  return responseJSON(data, 200)
}

export function serverError<TData>(data: TData) {
  return responseJSON(data, 500)
}
