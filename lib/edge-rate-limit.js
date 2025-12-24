import { redis } from "./config/redis"
export async function edgeRateLimit(key, limit, windowSeconds) {
  try {
    const current = await redis.incr(key)
    if (current === 1) {
      await redis.expire(key, windowSeconds)
    }
    return current <= limit
  } catch (err) {
    console.error("Edge rate limit failed:", err)
    return true
  }
}
