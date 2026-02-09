import { Conversation } from '@/components/conversation'

export default function Home() {
  return (
    <>
      <h1 className='max-w-sm text-center text-4xl font-bold'>
        Royal Paws Veterinary AI Assistant
      </h1>
      <Conversation />
    </>
  )
}
