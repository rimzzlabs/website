export type TUmamiStatType = 'pageviews' | 'uniques' | 'bounces' | 'totaltime'

export type TUmamiAuthResponse = {
  token: string
  user: {
    id: string
    username: string
    createdAt: string
  }
}

export type TUmamiStatResponse = {
  [K in TUmamiStatType]: { value: number; change: number }
}
