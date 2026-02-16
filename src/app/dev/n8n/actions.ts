'use server'

import { err, ok } from '@/lib/result'
import { InputDataSchema, N8nResponseSchema } from './schemas'
import { InputData, Response, ResponseData } from './types'

const URL = process.env.N8N_WEBHOOK_URL

/*
Reference:
- Form input data: email
- Server action will validate the input and send a POST request to N8N_WEBHOOK_URL with the email in the body. The server action will also validate the response from n8n and return a success/error response to the client.
- N8N workflow:
  - Trigger: Webhook (POST to N8N_WEBHOOK_URL)
  - N8N will receive the email, it will add a submittedAt timestamp, and send the data as a message with Telegram
  - Example Response:
    - Success: {
  "ok": true,
  "data": {
    "id": 20,
    "email": "john@example.com",
    "submittedAt": "2026-02-16T02:01:24.226+01:00"
  }

  - Error: {
  "ok": false,
  "error": "Failed to submit form"
  }
*/

export async function submitForm(
  data: InputData,
): Promise<Response<ResponseData>> {
  try {
    if (!URL) return err('N8N webhook URL is not configured')

    // Validate input data
    const validatedInput = InputDataSchema.safeParse(data)

    if (!validatedInput.success) {
      const firstIssue = validatedInput.error.issues[0]?.message
      return err(firstIssue ?? 'Invalid input data')
    }

    // Send POST request to n8n webhook
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedInput.data),
    })

    if (!response.ok) {
      return err(
        `Failed to submit form: ${response.status} ${response.statusText}`,
      )
    }

    const responseBody: unknown = await response.json()

    // Validate response data
    const validatedResponse = N8nResponseSchema.safeParse(responseBody)

    if (!validatedResponse.success) {
      return err('Invalid response data from n8n')
    }

    if (!validatedResponse.data.ok) {
      return err(validatedResponse.data.error)
    }

    return ok(validatedResponse.data.data)
  } catch (error) {
    return err(error instanceof Error ? error.message : String(error))
  }
}

export async function submitFormAction(
  _previousState: Response<ResponseData> | null,
  formData: FormData,
): Promise<Response<ResponseData>> {
  const email = formData.get('email')

  return submitForm({ email: typeof email === 'string' ? email : '' })
}
