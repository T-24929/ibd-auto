import { useQuery } from '@tanstack/react-query'
import { vehicleQueries } from '../api/vehicles.queries'

export function useVehicleDetail(id: string | undefined) {
  const {
    data: vehicle = null,
    isLoading,
    error,
    refetch,
  } = useQuery({
    ...vehicleQueries.detail(id || ''),
    enabled: Boolean(id),
  })

  return {
    vehicle,
    isLoading: !id ? false : isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  }
}
