'use client'

import {
  ConversationContent,
  ConversationScrollButton,
  Conversation as ConversationUI,
} from '@/components/ui/conversation'
import type { Message } from '../types'

type ConversationMessagesProps = {
  messages: Message[]
}

/**
 * Displays the conversation messages in a scrollable container
 */
export function ConversationMessages({ messages }: ConversationMessagesProps) {
  return (
    <ConversationUI className='flex-1 rounded-lg border'>
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
  )
}
