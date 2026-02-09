'use client'

import { Button } from '@/components/ui/button'
// import { NEXT_PUBLIC_AGENT_ID } from '@/config/env/public'
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

  // Helper function to get signed URL from the server
  const getSignedUrl = async (): Promise<string> => {
    const response = await fetch('/api/get-signed-url')
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`)
    }
    const { signedUrl } = await response.json()
    return signedUrl
  }

  // Start conversation with microphone access and signed URL
  const startConversation = useCallback(async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get signed URL from the server
      const signedUrl = await getSignedUrl()

      // Start the conversation session
      await conversation.startSession({
        // agentId: NEXT_PUBLIC_AGENT_ID, // Agent ID from ElevenLabs
        // userId: 'your-user-id', // Optional field for tracking users
        // ? webrtc is recommended for lower latency in voice conversations
        // connectionType: 'webrtc', // Either 'webrtc' or 'websocket'
        signedUrl, // Signed URL for secure connection
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
