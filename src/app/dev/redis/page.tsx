'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'

type PingResponse = {
  ok: boolean
  key?: string
  value?: string | null
  error?: string
  redisUrlConfigured: boolean
}

export default function Page() {
  const [result, setResult] = useState<PingResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function runPing() {
    try {
      setIsLoading(true)
      const response = await fetch('/dev/redis/api/ping', { cache: 'no-store' })
      const data: PingResponse = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        ok: false,
        error: error instanceof Error ? error.message : 'Request failed',
        redisUrlConfigured: false,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-xl space-y-4'>
      <h1 className='text-2xl font-semibold'>Redis</h1>

      <Card>
        <CardHeader>
          <CardTitle>Redis set/get ping</CardTitle>
          <CardDescription>
            Runs a small Redis write/read check using `REDIS_URL`.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Button onClick={runPing} disabled={isLoading}>
            {isLoading ? 'Running…' : 'Run ping'}
          </Button>

          {result ? (
            <pre className='overflow-x-auto rounded-md border p-3 text-sm'>
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
