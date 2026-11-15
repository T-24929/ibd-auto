import type { Appointment, AppointmentStatus } from '@/types/database.types'

export type { Appointment, AppointmentStatus }

export interface CreateAppointmentDTO {
  vehicle_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  preferred_date: string
  preferred_time: string
  notes?: string
}
