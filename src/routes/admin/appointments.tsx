import { createFileRoute } from '@tanstack/react-router'
import { AdminAppointmentsPage } from '@/features/admin'
import { appointmentQueries } from '@/features/appointments/api/appointments.queries'

export const Route = createFileRoute('/admin/appointments')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(appointmentQueries.list())
  },
  component: AdminAppointmentsPage,
})
