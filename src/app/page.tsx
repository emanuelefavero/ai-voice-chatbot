import { Conversation } from '@/components/conversation'

export default function Home() {
  return (
    <>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        <h1 className='mb-8 text-center text-4xl font-bold'>
          ElevenLabs Agents
        </h1>
        <Conversation />
      </div>
    </>
  )
}
