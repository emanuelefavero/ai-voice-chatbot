import { Link } from '@/components/ui/link'

export default function Page() {
  return (
    <div className='max-w-xl space-y-4'>
      <h1 className='text-2xl font-semibold'>Redis</h1>
      <ul className='list-disc space-y-1 pl-5'>
        <li>
          <Link href='/dev/redis/kv'>KV playground (set/get/delete)</Link>
        </li>
        <li>
          <Link href='/dev/redis/ping'>Ping example (set/get ping)</Link>
        </li>
      </ul>
    </div>
  )
}
