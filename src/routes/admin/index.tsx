import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboardPage } from '@/features/admin'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'
import { appointmentQueries } from '@/features/appointments/api/appointments.queries'
import { contactQueries } from '@/features/contact/api/contact.queries'

export const Route = createFileRoute('/admin/')({
  loader: ({ context }) => {
    return Promise.all([
      context.queryClient.ensureQueryData(vehicleQueries.list()),
      context.queryClient.ensureQueryData(appointmentQueries.list()),
      context.queryClient.ensureQueryData(contactQueries.list()),
    ])
  },
  component: AdminDashboardPage,
})
