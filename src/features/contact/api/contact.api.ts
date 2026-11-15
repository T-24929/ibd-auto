import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { ContactMessage } from '@/types/database.types'
import type { CreateContactDTO } from '../types/contact.types'

const LOCAL_STORAGE_KEY = 'abc_contact_messages_store'

const INITIAL_MESSAGES: ContactMessage[] = []

function getLocalMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MESSAGES))
      return INITIAL_MESSAGES
    }
    return JSON.parse(raw)
  } catch {
    return INITIAL_MESSAGES
  }
}

function saveLocalMessages(list: ContactMessage[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Failed saving contact messages', e)
  }
}

export async function submitContactMessage(
  data: CreateContactDTO
): Promise<{ data: ContactMessage | null; error: Error | null }> {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000)
  const refId = `IBD-INQ-${randomSuffix}`

  const newMsg: ContactMessage = {
    id: refId,
    name: data.name,
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || null,
    subject: data.subject,
    message: data.message,
    is_read: false,
    created_at: new Date().toISOString(),
  }

  if (!isSupabaseConfigured) {
    const list = getLocalMessages()
    saveLocalMessages([newMsg, ...list])
    return { data: newMsg, error: null }
  }

  try {
    const { data: inserted, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          id: refId,
          name: data.name,
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || null,
          subject: data.subject,
          message: data.message,
          is_read: false,
        } as any,
      ])
      .select()
      .single()

    if (error) {
      const list = getLocalMessages()
      saveLocalMessages([newMsg, ...list])
      return { data: newMsg, error: null }
    }

    return { data: inserted as ContactMessage, error: null }
  } catch {
    const list = getLocalMessages()
    saveLocalMessages([newMsg, ...list])
    return { data: newMsg, error: null }
  }
}

export async function fetchContactMessages(): Promise<{ data: ContactMessage[]; error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { data: getLocalMessages(), error: null }
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return { data: getLocalMessages(), error: null }
    }

    return { data: (data as ContactMessage[]) || [], error: null }
  } catch {
    return { data: getLocalMessages(), error: null }
  }
}

export async function fetchUserContactMessages(
  email: string
): Promise<{ data: ContactMessage[]; error: Error | null }> {
  const normalized = email.trim().toLowerCase()
  const local = getLocalMessages()

  if (!isSupabaseConfigured) {
    const filtered = local.filter((m) => m.email.toLowerCase() === normalized)
    return { data: filtered, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .ilike('email', normalized)
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      const filtered = local.filter((m) => m.email.toLowerCase() === normalized)
      return { data: filtered, error: null }
    }

    return { data: data as ContactMessage[], error: null }
  } catch {
    const filtered = local.filter((m) => m.email.toLowerCase() === normalized)
    return { data: filtered, error: null }
  }
}

export async function markMessageRead(id: string, is_read: boolean = true): Promise<{ error: Error | null }> {
  const list = getLocalMessages()
  const updated = list.map((m) => (m.id === id ? { ...m, is_read } : m))
  saveLocalMessages(updated)

  if (!isSupabaseConfigured) {
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read } as any)
      .eq('id', id)
    return { error }
  } catch (err: any) {
    return { error: err }
  }
}
