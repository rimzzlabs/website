import { NextResponse } from 'next/server'

export const responseJSON = <TData = unknown>(data: TData, status: number) => {
  return NextResponse.json<TData>(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
