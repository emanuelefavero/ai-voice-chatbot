'use client'

import { Button } from '@/components/ui/button'

type ConversationControlsProps = {
  onStart: () => void
  onStop: () => void
  isConnected: boolean
}

/**
 * Control buttons for starting and stopping the conversation
 */
export function ConversationControls({
  onStart,
  onStop,
  isConnected,
}: ConversationControlsProps) {
  return (
    <div className='flex gap-2'>
      <Button onClick={onStart} disabled={isConnected} className='flex-1'>
        Start Conversation
      </Button>
      <Button
        onClick={onStop}
        disabled={!isConnected}
        variant='destructive'
        className='flex-1'
      >
        Stop Conversation
      </Button>
    </div>
  )
}
