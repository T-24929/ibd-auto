import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/database.types'

export interface AuthState {
  user: User | { id: string; email?: string; user_metadata?: Record<string, any> } | null
  profile: Profile | null
  isLoading: boolean
  isAdmin: boolean
}

export interface AuthContextType extends AuthState {
  login: (params: { email: string; password: string }) => Promise<{ error: Error | null }>
  register: (params: { email: string; password: string; fullName: string; phone?: string }) => Promise<{ error: Error | null }>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}
