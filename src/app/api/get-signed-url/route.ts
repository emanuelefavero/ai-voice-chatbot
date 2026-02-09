import { ELEVENLABS_API_KEY } from '@/config/env/private'
import { NEXT_PUBLIC_AGENT_ID } from '@/config/env/public'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${NEXT_PUBLIC_AGENT_ID}`,
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY!,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to get signed URL')
    }

    const data = await response.json()
    return NextResponse.json({ signedUrl: data.signed_url })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to generate signed URL' },
      { status: 500 },
    )
  }
}
