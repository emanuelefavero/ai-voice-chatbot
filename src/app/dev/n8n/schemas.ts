import { z } from 'zod'

export const InputDataSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
})

export const N8nResponseDataSchema = z.object({
  id: z.number(),
  email: z.email(),
  date: z.string(), // Formatted date string (e.g., "Feb 19, 2026 at 3:45 PM")
  submittedAt: z.iso.datetime({ offset: true }), // ISO date string
})

export const N8nSuccessSchema = z.object({
  ok: z.literal(true),
  data: N8nResponseDataSchema,
})

export const N8nErrorSchema = z.object({
  ok: z.literal(false),
  error: z.string(),
})

export const N8nResponseSchema = z.discriminatedUnion('ok', [
  N8nSuccessSchema,
  N8nErrorSchema,
])
