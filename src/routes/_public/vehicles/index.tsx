import { createFileRoute } from '@tanstack/react-router'
import { VehicleListingsPage } from '@/features/vehicles'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'

export interface VehicleSearchParams {
  search?: string
  make?: string
  model?: string
  bodyType?: string
  category?: string
  condition?: string
  location?: string
  fuelType?: string
  transmission?: string
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  maxMileage?: number
  sortBy?: 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'newest'
}

export const Route = createFileRoute('/_public/vehicles/')({
  validateSearch: (search: Record<string, unknown>): VehicleSearchParams => {
    return {
      search: typeof search.search === 'string' ? search.search : undefined,
      make: typeof search.make === 'string' ? search.make : undefined,
      model: typeof search.model === 'string' ? search.model : undefined,
      bodyType: typeof search.bodyType === 'string' ? search.bodyType : undefined,
      category: typeof search.category === 'string' ? search.category : undefined,
      condition: typeof search.condition === 'string' ? search.condition : undefined,
      location: typeof search.location === 'string' ? search.location : undefined,
      fuelType: typeof search.fuelType === 'string' ? search.fuelType : undefined,
      transmission: typeof search.transmission === 'string' ? search.transmission : undefined,
      minPrice: typeof search.minPrice === 'number' ? search.minPrice : undefined,
      maxPrice: typeof search.maxPrice === 'number' ? search.maxPrice : undefined,
      minYear: typeof search.minYear === 'number' ? search.minYear : undefined,
      maxYear: typeof search.maxYear === 'number' ? search.maxYear : undefined,
      maxMileage: typeof search.maxMileage === 'number' ? search.maxMileage : undefined,
      sortBy: typeof search.sortBy === 'string' ? (search.sortBy as any) : undefined,
    }
  },
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(vehicleQueries.list())
  },
  component: VehicleListingsPage,
})
