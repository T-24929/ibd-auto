import type { Appointment, ContactMessage, Vehicle } from '@/types/database.types'

export type OwnershipStage =
  | 'INSPECTION'
  | 'NEGOTIATION'
  | 'HOLDING_DEPOSIT'
  | 'DOCUMENTATION'
  | 'HANDOVER'

export interface OwnershipStepInfo {
  step: number
  key: OwnershipStage
  title: string
  subtitle: string
  description: string
  documentsRequired: string[]
}

export interface TrackedBookingResult {
  type: 'appointment' | 'inquiry'
  appointment?: Appointment
  inquiry?: ContactMessage
  vehicle?: Vehicle
}
