import type { Vehicle } from '@/types/database.types'

export type { Vehicle }

export interface VehicleFiltersState {
  search: string
  make: string
  model: string
  bodyType: string
  category: string
  condition: string
  location: string
  fuelType: string
  transmission: string
  status: string
  minPrice: number
  maxPrice: number
  minYear: number
  maxYear: number
  maxMileage: number
  minInstallment?: number
  maxInstallment?: number
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'newest'
}

export const DEFAULT_FILTERS: VehicleFiltersState = {
  search: '',
  make: 'all',
  model: 'all',
  bodyType: 'all',
  category: 'all',
  condition: 'all',
  location: 'all',
  fuelType: 'all',
  transmission: 'all',
  status: 'all',
  minPrice: 0,
  maxPrice: 100000000, // 100 Million LKR
  minYear: 2010,
  maxYear: new Date().getFullYear() + 1,
  maxMileage: 300000,
  sortBy: 'newest',
}
