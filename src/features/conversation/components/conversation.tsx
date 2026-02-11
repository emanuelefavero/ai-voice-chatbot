'use client'

import { useAgentState } from '../hooks/use-agent-state'
import { useConversationSession } from '../hooks/use-conversation-session'
import { ConversationControls } from './controls'
import { ConversationMessages } from './messages'
import { ConversationOrb } from './orb'

/**
 * Main Conversation component - orchestrates the conversation UI
 * This is a thin container that composes smaller, focused components
 */
export function Conversation() {
  const { conversation, startConversation, stopConversation } =
    useConversationSession()
  const agentState = useAgentState(conversation)
  const isConnected = conversation.status === 'connected'

  return (
    <div className='flex h-150 w-full flex-col gap-4'>
      {/* Orb - Fixed at top */}
      <ConversationOrb agentState={agentState} />

      {/* Chat Messages - Scrollable */}
      <ConversationMessages />

      {/* Controls - Fixed at bottom */}
      <ConversationControls
        onStart={startConversation}
        onStop={stopConversation}
        isConnected={isConnected}
      />
    </div>
  )
}
