// TODO @see api/get-signed-url/route.ts todo comment

/**
 * Fetches a signed URL from the server for secure ElevenLabs connection
 * @returns Promise resolving to the signed URL string
 * @throws Error if the request fails
 */
export async function getSignedUrl(): Promise<string> {
  const response = await fetch('/api/get-signed-url')

  if (!response.ok) {
    throw new Error(`Failed to get signed url: ${response.statusText}`)
  }

  const { signedUrl } = await response.json()
  return signedUrl
}
