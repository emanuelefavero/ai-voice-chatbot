import { create } from 'zustand'
import type { Message } from '../types'

type MessagesState = {
  messages: Message[]
  addMessage: (message: Omit<Message, 'id'>) => void
  clearMessages: () => void
}

/**
 * Zustand store for managing conversation messages
 * Provides global access to message history for cross-component usage
 */
export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),
}))
