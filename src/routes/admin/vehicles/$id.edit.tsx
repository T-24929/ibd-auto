import { createFileRoute } from '@tanstack/react-router'
import { AdminVehicleFormPage } from '@/features/admin'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'

export const Route = createFileRoute('/admin/vehicles/$id/edit')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(vehicleQueries.detail(params.id))
  },
  component: AdminVehicleFormPage,
})
