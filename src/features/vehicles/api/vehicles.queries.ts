import { queryOptions } from '@tanstack/react-query'
import { fetchVehicles, fetchVehicleById } from './vehicles.api'
import type { VehicleFiltersState } from '../types/vehicle.types'

export const vehicleQueries = {
  all: ['vehicles'] as const,
  lists: () => [...vehicleQueries.all, 'list'] as const,
  list: (filters?: Partial<VehicleFiltersState>) =>
    queryOptions({
      queryKey: [...vehicleQueries.lists(), filters ?? {}],
      queryFn: async () => {
        const { data, error } = await fetchVehicles()
        if (error) throw error
        return data
      },
      staleTime: 1000 * 60 * 3, // 3 minutes
    }),
  details: () => [...vehicleQueries.all, 'detail'] as const,
  detail: (id: string) =>
    queryOptions({
      queryKey: [...vehicleQueries.details(), id],
      queryFn: async () => {
        const { data, error } = await fetchVehicleById(id)
        if (error) throw error
        return data
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
}
