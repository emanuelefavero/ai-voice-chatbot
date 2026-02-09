'use client'

import { Button } from '@/components/ui/button'
import { NEXT_PUBLIC_AGENT_ID } from '@/config/env/public'
import { useConversation } from '@elevenlabs/react'
import { useCallback } from 'react'

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => {
      const { role, message: msg } = message
      const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1)
      console.log(`${capitalizedRole} message: ${msg}`)
    },
    onError: (error) => console.error('Error:', error),
  })

  const startConversation = useCallback(async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Start the conversation session
      await conversation.startSession({
        agentId: NEXT_PUBLIC_AGENT_ID, // Agent ID from ElevenLabs
        // userId: 'your-user-id', // Optional field for tracking users
        connectionType: 'webrtc', // Either 'webrtc' or 'websocket'
        // ? webrtc is recommended for lower latency in voice conversations
      })
    } catch (error) {
      console.error('Failed to start conversation:', error)
    }
  }, [conversation])

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex gap-2'>
        <Button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
        >
          Start Conversation
        </Button>
        <Button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          variant='destructive'
        >
          Stop Conversation
        </Button>
      </div>
      <div className='flex flex-col items-center'>
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  )
}
