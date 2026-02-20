import 'server-only'

import { createClient } from 'redis'

type RedisClient = ReturnType<typeof createClient>

type GlobalRedis = typeof globalThis & {
  __redisClient?: RedisClient
  __redisConnectPromise?: Promise<RedisClient>
}

const globalRedis = globalThis as GlobalRedis

function createRedisClient(url: string): RedisClient {
  const client = createClient({ url })

  client.on('error', (error) => {
    console.error('Redis client error:', error)
  })

  return client
}

/**
 * Get a Redis client instance. The client is shared across the application and will be connected on demand. If the client is already connected, it will be returned immediately. If the client is not connected, it will be connected and returned. If there is an error during connection, the error will be thrown.
 *
 * @returns {Promise<RedisClient>} A promise that resolves to the Redis client instance.
 */
export async function redis(): Promise<RedisClient> {
  const redisUrl = process.env.REDIS_URL

  if (!redisUrl) {
    throw new Error('Missing REDIS_URL environment variable')
  }

  if (!globalRedis.__redisClient) {
    globalRedis.__redisClient = createRedisClient(redisUrl)
  }

  const client = globalRedis.__redisClient

  if (client.isOpen) {
    return client
  }

  if (!globalRedis.__redisConnectPromise) {
    globalRedis.__redisConnectPromise = client
      .connect()
      .then(() => client)
      .finally(() => {
        globalRedis.__redisConnectPromise = undefined
      })
  }

  return globalRedis.__redisConnectPromise
}
