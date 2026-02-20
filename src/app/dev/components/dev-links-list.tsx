import { Link } from '@/components/ui/link'

export function DevLinksList() {
  return (
    <ul>
      <li>
        <Link href='/dev/n8n'>N8N</Link>
      </li>
      <li>
        <Link href='/dev/redis'>Redis</Link>
      </li>
    </ul>
  )
}
