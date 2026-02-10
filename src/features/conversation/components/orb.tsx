'use client'

import { Orb, type AgentState } from '@/components/ui/orb'
import { cn } from '@/lib/utils'
import { getOrbColors } from '../lib/orb-colors'

type ConversationOrbProps = {
  agentState: AgentState
  className?: string
}

/**
 * Orb component with dynamic colors based on agent state
 */
export function ConversationOrb({
  agentState,
  className,
}: ConversationOrbProps) {
  const colors = getOrbColors(agentState)

  return (
    <div className='flex h-48 w-full items-center justify-center'>
      <Orb
        agentState={agentState}
        className={cn(
          'h-full w-full transition-colors duration-300 ease-in-out',
          !agentState && 'opacity-75',
          className,
        )}
        colors={colors}
      />
    </div>
  )
}
