import { Redis } from 'ioredis'

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL as string

export const redis = new Redis(UPSTASH_REDIS_URL)
