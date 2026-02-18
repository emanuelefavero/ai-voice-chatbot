'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { submitFormAction } from '../actions'
import type { Response, ResponseData } from '../types'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} className='w-full'>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  )
}

async function submitWithToast(
  previousState: Response<ResponseData> | null,
  formData: FormData,
): Promise<Response<ResponseData>> {
  const loadingToastId = toast.loading('Sending Telegram message...')

  try {
    const result = await submitFormAction(previousState, formData)

    toast.dismiss(loadingToastId)

    if (!result.ok) {
      toast.error(result.error)
      return result
    }

    toast.success(
      `Telegram message sent with email ${result.data.email}, date: ${result.data.date}`,
    )

    return result
  } catch (error) {
    toast.dismiss(loadingToastId)

    const message = error instanceof Error ? error.message : String(error)
    toast.error(message)

    return {
      ok: false,
      error: message,
    }
  }
}

export function N8nForm() {
  const [state, formAction] = useActionState<
    Response<ResponseData> | null,
    FormData
  >(submitWithToast, null)

  return (
    <form action={formAction} className='w-full sm:max-w-100'>
      <Card>
        <CardHeader>
          <CardTitle>Submit Email to n8n</CardTitle>
          <CardDescription>
            Your email will be sent to an n8n webhook and processed by a
            workflow that sends a Telegram message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              placeholder='name@example.com'
              aria-invalid={Boolean(state && !state.ok)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  )
}
