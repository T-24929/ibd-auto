import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Vehicle } from '@/types/database.types'
import { INITIAL_VEHICLES } from '../data/vehicles.data'

const LOCAL_STORAGE_KEY = 'abc_vehicles_cache_v4'

function getLocalVehicles(): Vehicle[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_VEHICLES))
      return INITIAL_VEHICLES
    }
    const cached = JSON.parse(raw)
    if (Array.isArray(cached) && cached.length < INITIAL_VEHICLES.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_VEHICLES))
      return INITIAL_VEHICLES
    }
    return cached
  } catch {
    return INITIAL_VEHICLES
  }
}

function saveLocalVehicles(vehicles: Vehicle[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vehicles))
  } catch (e) {
    console.error('Failed saving local vehicles', e)
  }
}

export async function fetchVehicles(): Promise<{ data: Vehicle[]; error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { data: getLocalVehicles(), error: null }
  }

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Falling back to local cache due to Supabase query error:', error.message)
      return { data: getLocalVehicles(), error: null }
    }

    if (!data || data.length === 0) {
      // If table is newly created with no rows yet, provide the initial vehicles
      return { data: getLocalVehicles(), error: null }
    }

    return { data: data as Vehicle[], error: null }
  } catch {
    return { data: getLocalVehicles(), error: null }
  }
}

export async function fetchVehicleById(id: string): Promise<{ data: Vehicle | null; error: Error | null }> {
  if (!isSupabaseConfigured) {
    const found = getLocalVehicles().find((v) => v.id === id) || null
    return { data: found, error: found ? null : new Error('Vehicle not found') }
  }

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      const fallback = getLocalVehicles().find((v) => v.id === id) || null
      return { data: fallback, error: fallback ? null : error }
    }

    return { data: data as Vehicle, error: null }
  } catch {
    const fallback = getLocalVehicles().find((v) => v.id === id) || null
    return { data: fallback, error: null }
  }
}

export async function createVehicle(
  vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data: Vehicle | null; error: Error | null }> {
  const newVehicle: Vehicle = {
    ...vehicle,
    id: typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0
          const v = c === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  if (!isSupabaseConfigured) {
    const current = getLocalVehicles()
    const updated = [newVehicle, ...current]
    saveLocalVehicles(updated)
    return { data: newVehicle, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle as any])
      .select()
      .single()

    if (error) return { data: null, error }
    return { data: data as Vehicle, error: null }
  } catch (err: any) {
    return { data: null, error: err }
  }
}

export async function updateVehicle(
  id: string,
  updates: Partial<Vehicle>
): Promise<{ data: Vehicle | null; error: Error | null }> {
  if (!isSupabaseConfigured) {
    const current = getLocalVehicles()
    const index = current.findIndex((v) => v.id === id)
    if (index === -1) return { data: null, error: new Error('Vehicle not found') }
    const updated = { ...current[index], ...updates, updated_at: new Date().toISOString() }
    current[index] = updated
    saveLocalVehicles(current)
    return { data: updated, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .update({ ...updates, updated_at: new Date().toISOString() } as any)
      .eq('id', id)
      .select()
      .single()

    if (error) return { data: null, error }
    return { data: data as Vehicle, error: null }
  } catch (err: any) {
    return { data: null, error: err }
  }
}

export async function deleteVehicle(id: string): Promise<{ error: Error | null }> {
  if (!isSupabaseConfigured) {
    const current = getLocalVehicles().filter((v) => v.id !== id)
    saveLocalVehicles(current)
    return { error: null }
  }

  try {
    const { error } = await supabase.from('vehicles').delete().eq('id', id)
    return { error }
  } catch (err: any) {
    return { error: err }
  }
}
