'use client'

import { useConversation } from '@elevenlabs/react'
import { useCallback, useState } from 'react'
import { getSignedUrl } from '../lib/conversation-api'
import type { Message } from '../types'

/**
 * Custom hook that wraps the ElevenLabs conversation hook with app-specific logic
 * Manages conversation state, messages, and connection lifecycle
 */
export function useConversationSession() {
  const [messages, setMessages] = useState<Message[]>([])

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => {
      const { role, message: msg } = message
      const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1)
      console.log(`${capitalizedRole} message: ${msg}`)

      // Add message to state
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: role as Message['role'],
          message: msg,
        },
      ])
    },
    onError: (error) => console.error('Error:', error),
  })

  // Start conversation with microphone access and signed URL
  const startConversation = useCallback(async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get signed URL from the server
      const signedUrl = await getSignedUrl()

      // Start the conversation session
      await conversation.startSession({
        signedUrl,
        // userId: 'your-user-id', // Optional field for tracking users
      })
    } catch (error) {
      console.error('Failed to start conversation:', error)
    }
  }, [conversation])

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  return {
    conversation,
    messages,
    startConversation,
    stopConversation,
  }
}
