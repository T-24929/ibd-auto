import { createFileRoute } from '@tanstack/react-router'
import { AdminVehiclesPage } from '@/features/admin'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'

export const Route = createFileRoute('/admin/vehicles/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(vehicleQueries.list())
  },
  component: AdminVehiclesPage,
})
