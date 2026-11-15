import type { VehicleStatus } from '@/types/database.types'
import type { LucideIcon } from 'lucide-react'

export interface VehicleFormData {
  title: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  body_type: string
  color: string
  condition: string
  status: VehicleStatus
  location: string
  engine_capacity: string
  reg_number: string
  grade: string
  owners: string
  service_history: string
  doors: number
  seats: number
  featured: boolean
  images: string[]
  description: string
  features: string[]
}

export interface FormStepMeta {
  step: number
  id: string
  title: string
  shortTitle: string
  description: string
  icon: LucideIcon
}

export const POPULAR_MAKES = ['Toyota', 'Honda', 'Nissan', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Suzuki'] as const
export const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Truck', 'Coupe', 'Van', 'Wagon'] as const
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'] as const
export const TRANSMISSIONS = ['Automatic', 'Manual'] as const
export const CONDITIONS = ['Excellent', 'Good', 'Fair'] as const
export const OWNERS_OPTIONS = ['1st Owner', '2nd Owner', '3rd Owner', 'Direct Import (Unregistered)'] as const
export const SHOWROOM_LOCATIONS = [
  'Colombo Main Showroom',
  'Colombo City Branch',
  'Kandy Branch Showroom',
  'Kohuwala Showroom',
] as const

export const COMMON_FEATURES = [
  'Panoramic Moonroof',
  'JBL Premium Audio',
  'Apple CarPlay / Android Auto',
  '360 Parking Cameras',
  'Heated Leather Seats',
  'Radar Cruise Control',
  'Blind Spot Monitoring',
  'Factory Alloys',
] as const

export const DEFAULT_VEHICLE_FORM: VehicleFormData = {
  title: '',
  make: '',
  model: '',
  year: 2021,
  price: 12500000,
  mileage: 25000,
  fuel_type: 'Hybrid',
  transmission: 'Automatic',
  body_type: 'SUV',
  color: 'Pearl White',
  condition: 'Excellent',
  status: 'available',
  location: 'Colombo Main Showroom',
  engine_capacity: '2,000 cc',
  reg_number: '',
  grade: '',
  owners: '1st Owner',
  service_history: '',
  doors: 5,
  seats: 5,
  featured: false,
  images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'],
  description: '',
  features: ['360 Parking Cameras', 'Apple CarPlay', 'Alloy Wheels'],
}

export function buildVehiclePayload(formData: VehicleFormData) {
  return {
    title: formData.title || `${formData.year} ${formData.make} ${formData.model}`,
    make: formData.make,
    model: formData.model,
    year: Number(formData.year),
    price: Number(formData.price),
    mileage: Number(formData.mileage),
    fuel_type: formData.fuel_type,
    transmission: formData.transmission,
    body_type: formData.body_type,
    color: formData.color,
    condition: formData.condition,
    status: formData.status,
    location: formData.location,
    engine_capacity: formData.engine_capacity || null,
    reg_number: formData.reg_number || null,
    grade: formData.grade || null,
    owners: formData.owners || null,
    service_history: formData.service_history || null,
    doors: Number(formData.doors),
    seats: Number(formData.seats),
    featured: formData.featured,
    images: formData.images,
    description: formData.description || null,
    features: formData.features,
    created_by: null,
  }
}
