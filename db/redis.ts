import { Redis } from 'ioredis'

const UPSTASH_URL = process.env.UPSTASH_URL as string

export const redis = new Redis(UPSTASH_URL)
