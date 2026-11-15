import { useQuery } from '@tanstack/react-query'
import { AppointmentTable } from '../components/AppointmentTable'
import { appointmentQueries } from '@/features/appointments/api/appointments.queries'
import { CalendarClock } from 'lucide-react'
import { ErrorState } from '@/components/feedback'

export function AdminAppointmentsPage() {
  const { data: appointments = [], isLoading, isError, error, refetch } = useQuery(appointmentQueries.list())

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          <CalendarClock className="size-4" />
          <span>Customer Test Drives & Showroom Inspections</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Inspection Appointments
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review bookings, change status, verify customer contacts, and prepare test drive vehicles.
        </p>
      </div>

      {isLoading ? (
        <div className="h-64 rounded-2xl bg-muted/40 animate-pulse border border-border/40" />
      ) : isError ? (
        <ErrorState
          title="Failed to Load Appointments"
          description="Could not fetch test-drive bookings from the database. Please try again."
          error={error}
          onRetry={refetch}
          homeHref="/admin"
        />
      ) : (
        <AppointmentTable appointments={appointments} onRefresh={refetch} />
      )}
    </div>
  )
}
