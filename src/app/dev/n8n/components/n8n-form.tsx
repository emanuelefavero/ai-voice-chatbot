'use client'

import { Button } from '@/components/ui/button'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitFormAction } from '../actions'
import type { Response, ResponseData } from '../types'
import { formatSubmittedAt } from '../utils'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} className='w-full sm:w-auto'>
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
    <form
      action={formAction}
      className='space-y-4 rounded-lg border p-4 sm:p-6'
    >
      <div className='space-y-2'>
        <label htmlFor='email' className='text-sm font-medium'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          placeholder='name@example.com'
          aria-invalid={Boolean(state && !state.ok)}
          className='flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>

      <div aria-live='polite' className='min-h-5 text-sm'>
        <FormFeedback state={state} />
      </div>

      <SubmitButton />
    </form>
  )
}
