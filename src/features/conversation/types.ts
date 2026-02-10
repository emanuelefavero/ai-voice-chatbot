export type Role = 'user' | 'agent'

export type Message = {
  id: string
  role: Role
  message: string
}
