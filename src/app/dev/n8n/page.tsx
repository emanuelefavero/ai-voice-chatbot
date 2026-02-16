import { N8nForm } from './components/n8n-form'

export default function Page() {
  return (
    <main className='mx-auto max-w-2xl space-y-6 p-4 sm:p-6'>
      <h1 className='text-2xl font-semibold'>N8N Form</h1>
      <N8nForm />
    </main>
  )
}
