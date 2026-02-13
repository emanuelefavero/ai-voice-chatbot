import { BackButton } from '@/components/shared/back-button'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Link } from '@/components/ui/link'
import { TITLE } from '@/config/metadata'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type HeaderProps = ComponentProps<'header'>

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 px-4 py-3',
        className,
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <Link href='/' className='font-bold' variant='ghost'>
          {TITLE}
        </Link>
        <BackButton />
      </div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
      </div>
    </header>
  )
}
