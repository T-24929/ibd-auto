import { supabase, isSupabaseConfigured } from './supabase'
import type { Profile } from '@/types/database.types'

export interface SignUpParams {
  email: string
  password: string
  fullName: string
  phone?: string
}

export interface SignInParams {
  email: string
  password: string
}

export async function signUp({ email, password, fullName, phone }: SignUpParams) {
  if (!isSupabaseConfigured) {
    const mockUser = {
      id: 'user-' + Date.now(),
      email,
      user_metadata: { full_name: fullName, phone: phone || '' },
      role: 'authenticated'
    }
    const mockProfile: Profile = {
      id: mockUser.id,
      full_name: fullName,
      phone: phone || null,
      role: email.includes('admin') ? 'admin' : 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem('abc_auth_session', JSON.stringify({ user: mockUser, profile: mockProfile }))
    return { data: { user: mockUser, session: null }, error: null, profile: mockProfile }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || '',
      },
    },
  })

  if (error) return { data: null, error, profile: null }

  let profile: Profile | null = null
  if (data.user) {
    profile = await fetchProfile(data.user.id)
  }

  return { data, error: null, profile }
}

export async function signIn({ email, password }: SignInParams) {
  // Hardcoded Admin Demo Account
  if (email.toLowerCase().trim() === 'admin@gmail.com' && password === 'admin@123') {
    const adminUser = {
      id: 'admin-demo-001',
      email: 'admin@gmail.com',
      user_metadata: { full_name: 'Administrator' },
      role: 'authenticated',
    }
    const adminProfile: Profile = {
      id: 'admin-demo-001',
      full_name: 'Dealership Admin',
      phone: '+94 77 123 4567',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem('abc_auth_session', JSON.stringify({ user: adminUser, profile: adminProfile }))
    return { data: { user: adminUser, session: null }, error: null, profile: adminProfile }
  }

  if (!isSupabaseConfigured) {
    const isMockAdmin = email.toLowerCase().includes('admin')
    const mockUser = {
      id: isMockAdmin ? 'admin-user-001' : 'user-' + Math.floor(Math.random() * 10000),
      email,
      user_metadata: { full_name: isMockAdmin ? 'Administrator' : email.split('@')[0] },
      role: 'authenticated'
    }
    const mockProfile: Profile = {
      id: mockUser.id,
      full_name: isMockAdmin ? 'Administrator' : email.split('@')[0],
      phone: null,
      role: isMockAdmin ? 'admin' : 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem('abc_auth_session', JSON.stringify({ user: mockUser, profile: mockProfile }))
    return { data: { user: mockUser, session: null }, error: null, profile: mockProfile }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { data: null, error, profile: null }

  let profile: Profile | null = null
  if (data.user) {
    profile = await fetchProfile(data.user.id)
  }

  return { data, error: null, profile }
}

export async function signOut() {
  localStorage.removeItem('abc_auth_session')
  if (!isSupabaseConfigured) return { error: null }
  return await supabase.auth.signOut()
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem('abc_auth_session')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return parsed.profile
      } catch {
        return null
      }
    }
    return null
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !data) return null
    return data as Profile
  } catch {
    return null
  }
}
