'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/components/ui/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

type KvResult = {
  ok: boolean
  key?: string
  value?: string | null
  exists?: boolean
  ttlSeconds?: number | null
  deleted?: boolean
  error?: string
}

export default function Page() {
  const [key, setKey] = useState('example')
  const [value, setValue] = useState('hello redis')
  const [ttlSeconds, setTtlSeconds] = useState('60')
  const [activeTab, setActiveTab] = useState<'set' | 'get' | 'delete'>('set')
  const [result, setResult] = useState<KvResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState('')

  async function setValueAction() {
    try {
      setIsLoading(true)
      const parsedTtl = Number(ttlSeconds)
      const ttl =
        Number.isFinite(parsedTtl) && parsedTtl > 0 ? parsedTtl : undefined

      const response = await fetch('/dev/redis/api/kv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value, ttlSeconds: ttl }),
      })

      const data: KvResult = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        ok: false,
        error: error instanceof Error ? error.message : 'Request failed',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function getValueAction() {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/dev/redis/api/kv?key=${encodeURIComponent(key)}`,
        { cache: 'no-store' },
      )

      const data: KvResult = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        ok: false,
        error: error instanceof Error ? error.message : 'Request failed',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteValueAction() {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/dev/redis/api/kv?key=${encodeURIComponent(key)}`,
        { method: 'DELETE' },
      )

      const data: KvResult = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        ok: false,
        error: error instanceof Error ? error.message : 'Request failed',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function copyKeyToClipboard() {
    if (!key) return

    try {
      await navigator.clipboard.writeText(key)
      setCopyFeedback('Copied')
      setTimeout(() => {
        setCopyFeedback('')
      }, 1500)
    } catch {
      setCopyFeedback('Copy failed')
    }
  }

  return (
    <div className='w-full space-y-4 sm:max-w-100'>
      <h1 className='text-2xl font-semibold'>Redis Key-Value playground</h1>
      <p>
        <Link href='/dev/redis'>Back to Redis examples</Link>
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Set / Get / Delete</CardTitle>
          <CardDescription>
            Minimal key-value example using Redis via Next.js route handlers.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Tabs
            value={activeTab}
            onValueChange={(nextTab) =>
              setActiveTab(nextTab as 'set' | 'get' | 'delete')
            }
          >
            <TabsList>
              <TabsTrigger value='set'>Set</TabsTrigger>
              <TabsTrigger value='get'>Get</TabsTrigger>
              <TabsTrigger value='delete'>Delete</TabsTrigger>
            </TabsList>

            <TabsContent value='set' className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between gap-2'>
                  <Label htmlFor='redis-key-set'>Key</Label>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={copyKeyToClipboard}
                      disabled={!key}
                    >
                      Copy key
                    </Button>
                    {copyFeedback ? (
                      <span className='text-xs text-muted-foreground'>
                        {copyFeedback}
                      </span>
                    ) : null}
                  </div>
                </div>
                <Input
                  id='redis-key-set'
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='redis-value'>Value</Label>
                <Input
                  id='redis-value'
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='redis-ttl'>TTL seconds (optional)</Label>
                <Input
                  id='redis-ttl'
                  inputMode='numeric'
                  value={ttlSeconds}
                  onChange={(event) => setTtlSeconds(event.target.value)}
                />
              </div>

              <Button onClick={setValueAction} disabled={isLoading || !key}>
                Set
              </Button>
            </TabsContent>

            <TabsContent value='get' className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='redis-key-get'>Key</Label>
                <Input
                  id='redis-key-get'
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
                />
              </div>

              <Button onClick={getValueAction} disabled={isLoading || !key}>
                Get
              </Button>
            </TabsContent>

            <TabsContent value='delete' className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='redis-key-delete'>Key</Label>
                <Input
                  id='redis-key-delete'
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
                />
              </div>

              <Button onClick={deleteValueAction} disabled={isLoading || !key}>
                Delete
              </Button>
            </TabsContent>
          </Tabs>

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
