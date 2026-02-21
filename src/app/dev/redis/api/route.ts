import { redis } from '@/app/dev/redis/lib/redis'
import { NextResponse } from 'next/server'

type SetBody = {
  key?: string
  value?: string
  ttlSeconds?: number
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const key = url.searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { ok: false, error: 'Missing key' },
        { status: 400 },
      )
    }

    const client = await redis()
    const value = await client.get(key)
    const ttlSeconds = await client.ttl(key)

    return NextResponse.json({
      ok: true,
      key,
      value,
      exists: value !== null,
      ttlSeconds,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SetBody
    const key = body.key?.trim()
    const value = body.value
    const ttlSeconds = body.ttlSeconds

    if (!key) {
      return NextResponse.json(
        { ok: false, error: 'Missing key' },
        { status: 400 },
      )
    }

    if (typeof value !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Value must be a string' },
        { status: 400 },
      )
    }

    const client = await redis()

    if (typeof ttlSeconds === 'number' && ttlSeconds > 0) {
      await client.set(key, value, { EX: ttlSeconds })
    } else {
      await client.set(key, value)
    }

    return NextResponse.json({
      ok: true,
      key,
      value,
      ttlSeconds:
        typeof ttlSeconds === 'number' && ttlSeconds > 0 ? ttlSeconds : null,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const key = url.searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { ok: false, error: 'Missing key' },
        { status: 400 },
      )
    }

    const client = await redis()
    const deleted = await client.del(key)

    return NextResponse.json({ ok: true, key, deleted: deleted > 0 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
