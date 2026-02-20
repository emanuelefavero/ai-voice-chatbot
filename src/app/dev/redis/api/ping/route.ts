import { redis } from '@/app/dev/redis/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const client = await redis()
    const key = `dev:redis:ping:${Date.now()}`
    const value = `pong:${Date.now()}`

    await client.set(key, value, { EX: 60 })
    const storedValue = await client.get(key)
    await client.del(key)

    return NextResponse.json({
      ok: storedValue === value,
      key,
      value: storedValue,
      redisUrlConfigured: Boolean(process.env.REDIS_URL),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        ok: false,
        error: message,
        redisUrlConfigured: Boolean(process.env.REDIS_URL),
      },
      { status: 500 },
    )
  }
}
