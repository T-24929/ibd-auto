import type { ContactMessage } from '@/types/database.types'

export type { ContactMessage }

export interface CreateContactDTO {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}
