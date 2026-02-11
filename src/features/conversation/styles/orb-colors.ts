import type { AgentState } from '@/components/ui/orb'
type Hex = `#${string}`

const DEFAULT_COLORS: [Hex, Hex] = ['#8d63e9', '#aab9e3']

const ORB_COLORS: Record<NonNullable<AgentState>, [Hex, Hex]> = {
  thinking: ['#714ad9', '#8c98b8'],
  listening: ['#9173f5', '#b1bfe3'],
  talking: ['#b892f0', '#cfdbff'],
}

/**
 * Returns a tuple of two colors for the Orb component based on agent state
 * @param state - The current agent state (null | 'thinking' | 'listening' | 'talking')
 * @returns A tuple of two hex color strings [primary, secondary]
 */
export function getOrbColors(state: AgentState): [Hex, Hex] {
  return state ? ORB_COLORS[state] : DEFAULT_COLORS
}
