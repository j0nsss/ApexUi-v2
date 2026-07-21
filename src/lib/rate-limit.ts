import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const hasUpstash = !!UPSTASH_URL && !!UPSTASH_TOKEN

const redis = hasUpstash
  ? new Redis({ url: UPSTASH_URL!, token: UPSTASH_TOKEN! })
  : null

function noopRateLimit() {
  return { success: true, limit: 999, remaining: 999, reset: 0 }
}

export const submissionRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
    })
  : { limit: noopRateLimit } as unknown as Ratelimit

export const searchRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '60 s'),
    })
  : { limit: noopRateLimit } as unknown as Ratelimit

export const engagementRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, '60 s'),
    })
  : { limit: noopRateLimit } as unknown as Ratelimit
