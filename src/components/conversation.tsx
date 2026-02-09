'use client'

import { Button } from '@/components/ui/button'
import {
  ConversationContent,
  ConversationScrollButton,
  Conversation as ConversationUI,
} from '@/components/ui/conversation'
import { Orb, type AgentState } from '@/components/ui/orb'
import { cn } from '@/lib/utils'
import { useConversation } from '@elevenlabs/react'
import { useCallback, useState } from 'react'

type Role = 'user' | 'agent'

type Message = {
  id: string
  role: Role
  message: string
}

export function Conversation() {
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
          role: role as Role,
          message: msg,
        },
      ])
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
        signedUrl, // Signed URL for secure connection
        // userId: 'your-user-id', // Optional field for tracking users
      })
    } catch (error) {
      console.error('Failed to start conversation:', error)
    }
  }, [conversation])

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  // Derive agent state for the Orb
  const agentState: AgentState =
    conversation.status === 'connected'
      ? conversation.isSpeaking
        ? 'talking'
        : 'listening'
      : conversation.status === 'connecting'
        ? 'thinking'
        : null

  return (
    <div className='flex h-150 w-full flex-col gap-8'>
      {/* Orb - Fixed at top, show grey colors when agentState is null */}
      <div className='flex h-36 w-full items-center justify-center'>
        <Orb
          agentState={agentState}
          className={cn(
            'h-full w-full transition-colors duration-300 ease-in-out',
            !agentState && 'opacity-60 grayscale-25',
          )}
          colors={['#8d63e9', '#b9c8f4']}
        />
      </div>

      {/* Chat Messages - Scrollable */}
      <ConversationUI className='flex-1 rounded-lg border border-muted dark:border-muted/30'>
        <ConversationContent>
          {messages.length === 0 ? (
            <div className='flex h-full items-center justify-center text-muted-foreground'>
              Start a conversation to see messages
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </ConversationUI>

      {/* Controls - Fixed at bottom */}
      <div className='flex gap-2'>
        <Button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className='flex-1 font-bold'
        >
          Start Conversation
        </Button>
        <Button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          variant='secondary'
          className='flex-1 font-bold'
        >
          Stop Conversation
        </Button>
      </div>
    </div>
  )
}
