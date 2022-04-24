import umami from '@/libs/umami'

const USERNAME = process.env.UMAMI_USERNAME
const PASSWORD = process.env.UMAMI_PASSWORD

export const getTokenFromUmami = async () => {
  const body = { username: USERNAME, password: PASSWORD }
  try {
    const response = await umami.post<{ token: string }>('/api/auth/login', body)
    // return null if the status not 200
    if (response.status !== 200) {
      return null
    }
    // return the token
    return response.data.token
  } catch (error) {
    return null
  }
}
