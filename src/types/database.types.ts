export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'user' | 'admin'
export type VehicleStatus = 'available' | 'reserved' | 'sold'
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
export type TransmissionType = 'Automatic' | 'Manual'
export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Truck' | 'Coupe' | 'Van' | 'Wagon'
export type VehicleCondition = 'Excellent' | 'Good' | 'Fair'

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number // In LKR (Rs.)
  mileage: number // In Kilometers (km)
  fuel_type: FuelType | string
  transmission: TransmissionType | string
  body_type: BodyType | string
  color: string
  condition: VehicleCondition | string
  status: VehicleStatus
  description: string | null
  images: string[]
  location: string | null // e.g. "Nugegoda, Colombo"
  doors: number | null
  seats: number | null
  engine_capacity: string | null // e.g. "1,000 cc" or "1000 cc"
  reg_number?: string | null // e.g. "CBR-xxxx" or "Unregistered"
  grade?: string | null // e.g. "X Grade", "G Grade", "M Sport"
  owners?: string | null // e.g. "1st Owner", "2nd Owner"
  features?: string[] | null // e.g. ["4-Way Camera", "Nano Coating", "Alloy Wheels"]
  service_history?: string | null // e.g. "Toyota Lanka Maintained"
  featured: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  vehicle_id: string
  user_id: string | null
  customer_name: string
  customer_email: string
  customer_phone: string
  preferred_date: string
  preferred_time: string
  scheduled_date?: string
  scheduled_time?: string
  status: AppointmentStatus
  notes: string | null
  created_at: string
  updated_at: string
  vehicle?: Vehicle
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Omit<Profile, 'id'>> & { id: string }
        Update: Partial<Profile>
      }
      vehicles: {
        Row: Vehicle
        Insert: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Vehicle>
      }
      appointments: {
        Row: Appointment
        Insert: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'vehicle'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Appointment>
      }
      contact_messages: {
        Row: ContactMessage
        Insert: Omit<ContactMessage, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<ContactMessage>
      }
    }
  }
}
