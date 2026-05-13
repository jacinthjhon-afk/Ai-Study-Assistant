export type Profile = {
  id: string
  name: string | null
  created_at: string
}

export type StudyResource = {
  id: string
  user_id: string
  title: string
  content: string | null
  resource_url: string | null
  created_at: string
}

export type ChatMessage = {
  id: string
  user_id: string
  role: 'user' | 'assistant'
  message: string
  created_at: string
}