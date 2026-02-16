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
import { submitFormAction } from '../actions'
import type { Response, ResponseData } from '../types'
import { formatSubmittedAt } from '../utils'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} className='w-full'>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  )
}

type FormFeedbackProps = {
  state: Response<ResponseData> | null
}

function FormFeedback({ state }: FormFeedbackProps) {
  const { pending } = useFormStatus()

  if (pending) {
    return <p className='text-muted-foreground'>Sending Telegram message...</p>
  }

  if (state && !state.ok) {
    return <p className='text-destructive'>{state.error}</p>
  }

  if (state && state.ok) {
    const formattedDate = formatSubmittedAt(state.data.submittedAt)

    return (
      <p className='text-primary'>
        Telegram message sent with email {state.data.email}, date:{' '}
        {formattedDate}
      </p>
    )
  }

  return null
}

export function N8nForm() {
  const [state, formAction] = useActionState<
    Response<ResponseData> | null,
    FormData
  >(submitFormAction, null)

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

          <div aria-live='polite' className='min-h-5 text-sm'>
            <FormFeedback state={state} />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  )
}
