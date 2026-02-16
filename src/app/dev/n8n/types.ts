import type { Result } from '@/lib/result'
import type { z } from 'zod'
import {
  InputDataSchema,
  N8nResponseDataSchema,
  N8nResponseSchema,
} from './schemas'

export type InputData = z.infer<typeof InputDataSchema>

export type Response<T> = Result<T, string>

export type ResponseData = z.infer<typeof N8nResponseDataSchema>

export type N8nResponse = z.infer<typeof N8nResponseSchema>
