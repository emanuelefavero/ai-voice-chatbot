import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'

const linkVariants = cva(
  'underline-offset-4 outline-none hover:underline focus-visible:underline',
  {
    variants: {
      variant: {
        default: 'text-link',
        ghost: 'text-inherit',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Link({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof NextLink> & VariantProps<typeof linkVariants>) {
  return (
    <NextLink className={cn(linkVariants({ variant, className }))} {...props} />
  )
}

export { Link, linkVariants }
