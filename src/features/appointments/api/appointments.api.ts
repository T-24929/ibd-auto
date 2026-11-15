import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Appointment, AppointmentStatus, Vehicle } from '@/types/database.types'
import { INITIAL_VEHICLES } from '@/features/vehicles/data/vehicles.data'
import type { CreateAppointmentDTO } from '../types/appointment.types'

const LOCAL_STORAGE_KEY = 'abc_appointments_store'

const INITIAL_APPOINTMENTS: Appointment[] = []

function enrichWithVehicle(appt: Appointment): Appointment {
  if (appt.vehicle) return appt
  const found = INITIAL_VEHICLES.find((v) => v.id === appt.vehicle_id)
  return found ? { ...appt, vehicle: found } : appt
}

function getLocalAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS))
      return INITIAL_APPOINTMENTS.map(enrichWithVehicle)
    }
    const list: Appointment[] = JSON.parse(raw)
    return list.map(enrichWithVehicle)
  } catch {
    return INITIAL_APPOINTMENTS.map(enrichWithVehicle)
  }
}

function saveLocalAppointments(list: Appointment[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Failed saving local appointments', e)
  }
}

export async function createAppointment(
  data: CreateAppointmentDTO,
  userId?: string | null
): Promise<{ data: Appointment | null; error: Error | null }> {
  // Generate a memorable tracking reference code
  const randomSuffix = Math.floor(100000 + Math.random() * 900000)
  const refId = `IBD-APPT-${randomSuffix}`

  const targetVehicle: Vehicle | undefined = INITIAL_VEHICLES.find((v) => v.id === data.vehicle_id)

  const newAppointment: Appointment = {
    id: refId,
    vehicle_id: data.vehicle_id,
    user_id: userId || null,
    customer_name: data.customer_name,
    customer_email: data.customer_email.trim().toLowerCase(),
    customer_phone: data.customer_phone.trim(),
    preferred_date: data.preferred_date,
    preferred_time: data.preferred_time,
    status: 'pending',
    notes: data.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    vehicle: targetVehicle,
  }

  try {
    const rawGuest = localStorage.getItem('abc_guest_appts')
    const list: string[] = rawGuest ? JSON.parse(rawGuest) : []
    if (!list.includes(refId)) {
      list.unshift(refId)
      localStorage.setItem('abc_guest_appts', JSON.stringify(list))
    }
    localStorage.setItem('abc_guest_email', data.customer_email.trim().toLowerCase())
    localStorage.setItem('abc_guest_last_appt', refId)
  } catch {}

  if (!isSupabaseConfigured) {
    const current = getLocalAppointments()
    saveLocalAppointments([newAppointment, ...current])
    return { data: newAppointment, error: null }
  }

  try {
    const { data: inserted, error } = await supabase
      .from('appointments')
      .insert([
        {
          id: refId,
          vehicle_id: data.vehicle_id,
          user_id: userId || null,
          customer_name: data.customer_name,
          customer_email: data.customer_email.trim().toLowerCase(),
          customer_phone: data.customer_phone.trim(),
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          status: 'pending',
          notes: data.notes || null,
        } as any,
      ])
      .select('*, vehicle:vehicles(*)')
      .single()

    if (error) {
      const current = getLocalAppointments()
      saveLocalAppointments([newAppointment, ...current])
      return { data: newAppointment, error: null }
    }

    return { data: enrichWithVehicle(inserted as Appointment), error: null }
  } catch {
    const current = getLocalAppointments()
    saveLocalAppointments([newAppointment, ...current])
    return { data: newAppointment, error: null }
  }
}

export async function fetchAppointments(): Promise<{ data: Appointment[]; error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { data: getLocalAppointments(), error: null }
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, vehicle:vehicles(*)')
      .order('created_at', { ascending: false })

    if (error) {
      return { data: getLocalAppointments(), error: null }
    }

    const list = ((data as any) || []).map(enrichWithVehicle)
    return { data: list, error: null }
  } catch {
    return { data: getLocalAppointments(), error: null }
  }
}

export async function fetchUserAppointments(
  userId?: string | null,
  email?: string | null
): Promise<{ data: Appointment[]; error: Error | null }> {
  const local = getLocalAppointments()
  let normalizedEmail = email?.trim().toLowerCase()
  if (!normalizedEmail && typeof window !== 'undefined') {
    normalizedEmail = localStorage.getItem('abc_guest_email') || undefined
  }

  let guestIds: string[] = []
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('abc_guest_appts')
      if (raw) guestIds = JSON.parse(raw)
    } catch {}
  }

  if (!isSupabaseConfigured) {
    const matched = local.filter((a) => {
      if (userId && a.user_id === userId) return true
      if (normalizedEmail && a.customer_email?.toLowerCase() === normalizedEmail) return true
      if (guestIds.includes(a.id)) return true
      return false
    })
    return { data: matched, error: null }
  }

  try {
    let query = supabase.from('appointments').select('*, vehicle:vehicles(*)')
    if (userId && normalizedEmail) {
      query = query.or(`user_id.eq.${userId},customer_email.ilike.${normalizedEmail}`)
    } else if (userId) {
      query = query.eq('user_id', userId)
    } else if (normalizedEmail) {
      query = query.ilike('customer_email', normalizedEmail)
    } else if (guestIds.length > 0) {
      query = query.in('id', guestIds)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error || !data || data.length === 0) {
      const fallback = local.filter((a) => {
        if (userId && a.user_id === userId) return true
        if (normalizedEmail && a.customer_email?.toLowerCase() === normalizedEmail) return true
        if (guestIds.includes(a.id)) return true
        return false
      })
      return { data: fallback, error: null }
    }

    return { data: (data as any).map(enrichWithVehicle), error: null }
  } catch {
    return { data: local, error: null }
  }
}

export async function lookupAppointment(
  query: string
): Promise<{ data: Appointment | null; error: Error | null }> {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return { data: null, error: new Error('Please enter a booking reference, phone, or email.') }

  const local = getLocalAppointments()
  const cleanPhone = trimmed.replace(/\D/g, '')

  const found = local.find((a) => {
    if (a.id.toLowerCase() === trimmed) return true
    if (a.customer_email.toLowerCase() === trimmed) return true
    if (cleanPhone && a.customer_phone.replace(/\D/g, '').includes(cleanPhone)) return true
    return false
  })

  return { data: found || null, error: found ? null : new Error('No matching appointment found with the given details.') }
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<{ error: Error | null }> {
  const current = getLocalAppointments()
  const updated = current.map((a) =>
    a.id === id ? { ...a, status, updated_at: new Date().toISOString() } : a
  )
  saveLocalAppointments(updated)

  if (!isSupabaseConfigured) {
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status, updated_at: new Date().toISOString() } as any)
      .eq('id', id)
    return { error }
  } catch (err: any) {
    return { error: err }
  }
}
