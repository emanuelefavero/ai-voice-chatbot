// import { DevLinksList } from '@/app/__dev__/components/dev-links-list'
import { isDev } from '@/config/env/public'
import { Conversation } from '@/features/conversation'
import dynamic from 'next/dynamic'

const DynamicDevLinksList = dynamic(() =>
  import('@/app/dev/components/dev-links-list').then(
    (mod) => mod.DevLinksList, // Named export, so we need this
  ),
)

export default function Home() {
  return (
    <>
      {isDev && <DynamicDevLinksList />}

      <h1 className='max-w-sm text-center text-4xl font-bold'>
        Royal Paws Veterinary AI Assistant
      </h1>
      <Conversation />
    </>
  )
}
