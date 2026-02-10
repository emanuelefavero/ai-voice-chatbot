import type { AgentState } from '@/components/ui/orb'
import { cva, type VariantProps } from 'class-variance-authority'

// Define the base colors as constants (SSOT)
const BASE_COLORS = ['#8d63e9', '#b9c8f4'] as const

// Create CVA variants for orb colors based on agent state
const orbColorVariants = cva('', {
  variants: {
    state: {
      null: BASE_COLORS,
      thinking: ['#7a57d5', '#a8b8e0'], // Slightly muted/darker for processing feel
      listening: ['#9b73f5', '#c9d8ff'], // Slightly brighter for active feel
      talking: ['#956be9', '#b9c8f4'], // Subtle hue shift on primary
    },
  },
  defaultVariants: {
    state: 'null',
  },
})

export type OrbColorVariants = VariantProps<typeof orbColorVariants>

/**
 * Returns a tuple of two colors for the Orb component based on agent state
 * @param state - The current agent state (null | 'thinking' | 'listening' | 'talking')
 * @returns A tuple of two hex color strings [primary, secondary]
 */
export function getOrbColors(state: AgentState): [string, string] {
  const colors = orbColorVariants({ state: state as OrbColorVariants['state'] })

  // Map state to colors
  const colorMap: Record<string, [string, string]> = {
    null: BASE_COLORS as [string, string],
    thinking: ['#7a57d5', '#a8b8e0'],
    listening: ['#9b73f5', '#c9d8ff'],
    talking: ['#956be9', '#b9c8f4'],
  }

  return colorMap[state ?? 'null'] || (BASE_COLORS as [string, string])
}
