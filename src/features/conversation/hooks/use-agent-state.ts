'use client'

import type { AgentState } from '@/components/ui/orb'
import type { useConversation } from '@elevenlabs/react'

/**
 * Derives the agent state from the conversation status and speaking state
 * @param conversation - The conversation hook return value
 * @returns The current agent state
 */
export function useAgentState(
  conversation: ReturnType<typeof useConversation>,
): AgentState {
  const agentState: AgentState =
    conversation.status === 'connected'
      ? conversation.isSpeaking
        ? 'talking'
        : 'listening'
      : conversation.status === 'connecting'
        ? 'thinking'
        : null

  return agentState
}
