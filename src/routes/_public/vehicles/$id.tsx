import { createFileRoute } from '@tanstack/react-router'
import { VehicleDetailPage } from '@/features/vehicles'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'

export const Route = createFileRoute('/_public/vehicles/$id')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(vehicleQueries.detail(params.id))
  },
  component: VehicleDetailPage,
})
