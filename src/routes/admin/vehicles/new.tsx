import { createFileRoute } from '@tanstack/react-router'
import { AdminVehicleFormPage } from '@/features/admin'

export const Route = createFileRoute('/admin/vehicles/new')({
  component: AdminVehicleFormPage,
})
