import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { signIn, signUp, signOut, fetchProfile } from '@/lib/auth'
import type { AuthContextType } from '../types/auth.types'
import type { Profile } from '@/types/database.types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    if (!user) return
    const updated = await fetchProfile(user.id)
    if (updated) setProfile(updated)
  }, [user])

  useEffect(() => {
    let mounted = true

    async function initializeAuth() {
      // Check for hardcoded demonstration session
      const storedSession = localStorage.getItem('abc_auth_session')
      if (storedSession) {
        try {
          const parsed = JSON.parse(storedSession)
          if (parsed.user?.email === 'admin@gmail.com' || !isSupabaseConfigured) {
            if (mounted) {
              setUser(parsed.user)
              setProfile(parsed.profile)
              setIsLoading(false)
            }
            return
          }
        } catch {
          localStorage.removeItem('abc_auth_session')
        }
      }

      if (!isSupabaseConfigured) {
        if (mounted) setIsLoading(false)
        return
      }

      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user && mounted) {
          setUser(session.user)
          const prof = await fetchProfile(session.user.id)
          if (mounted) setProfile(prof)
        }
      } catch (err) {
        console.error('Error fetching Supabase session:', err)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    initializeAuth()

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            setUser(session.user)
            const prof = await fetchProfile(session.user.id)
            setProfile(prof)
          } else {
            setUser(null)
            setProfile(null)
          }
          setIsLoading(false)
        }
      )
      return () => {
        mounted = false
        subscription.unsubscribe()
      }
    }

    return () => {
      mounted = false
    }
  }, [])

  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const result = await signIn({ email, password })
      if (result.error) {
        return { error: result.error as Error }
      }
      if (result.data?.user) {
        setUser(result.data.user)
        setProfile(result.profile)
      }
      return { error: null }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({
    email,
    password,
    fullName,
    phone,
  }: {
    email: string
    password: string
    fullName: string
    phone?: string
  }) => {
    setIsLoading(true)
    try {
      const result = await signUp({ email, password, fullName, phone })
      if (result.error) {
        return { error: result.error as Error }
      }
      if (result.data?.user) {
        setUser(result.data.user)
        setProfile(result.profile)
      }
      return { error: null }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    await signOut()
    setUser(null)
    setProfile(null)
    setIsLoading(false)
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
