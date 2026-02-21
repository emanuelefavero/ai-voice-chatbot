import RedisCard from './components/redis-card'

export default function Page() {
  return (
    <div className='w-full space-y-4 sm:max-w-100'>
      <h1 className='text-2xl font-semibold'>Redis</h1>
      <RedisCard />
    </div>
  )
}
