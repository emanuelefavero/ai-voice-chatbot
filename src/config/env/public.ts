/**
 * @fileoverview Public environment config and constants.
 * Safe to import in client components.
 */

type NodeEnv = 'development' | 'production' | 'test'

const NODE_ENV: NodeEnv = (process.env.NODE_ENV as NodeEnv) || 'development'

export const isDev = NODE_ENV === 'development'
export const isProd = NODE_ENV === 'production'
export const isTest = NODE_ENV === 'test'

export const NEXT_PUBLIC_AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID || ''
