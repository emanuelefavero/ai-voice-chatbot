'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function BackButton() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/') return null // Hide on home page

  return (
    <Button variant='outline' onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  )
}
