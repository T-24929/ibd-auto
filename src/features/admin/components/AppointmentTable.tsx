import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Appointment, AppointmentStatus } from '@/types/database.types'
import { updateAppointmentStatus } from '@/features/appointments/api/appointments.api'
import { appointmentQueries } from '@/features/appointments/api/appointments.queries'
import { toast } from 'sonner'
import { CalendarX } from 'lucide-react'
import { EmptyState } from '@/components/feedback'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AppointmentMobileCard } from './AppointmentMobileCard'
import { AppointmentDetailSheet } from './AppointmentDetailSheet'
import { getAppointmentColumns } from './appointmentColumns'

interface AppointmentTableProps {
  appointments: Appointment[]
  onRefresh?: () => void
  hideFilters?: boolean
}

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const

export function AppointmentTable({
  appointments,
  onRefresh,
  hideFilters = false,
}: AppointmentTableProps) {
  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: AppointmentStatus }) => {
      const res = await updateAppointmentStatus(id, status)
      if (res.error) throw res.error
      return res
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: appointmentQueries.all })
      toast.success(`Appointment marked as ${vars.status}`)
      if (selectedAppt && selectedAppt.id === vars.id) {
        setSelectedAppt((prev) => (prev ? { ...prev, status: vars.status } : null))
      }
      if (onRefresh) onRefresh()
    },
    onError: (err: any) => {
      toast.error('Failed updating appointment', { description: err.message })
    },
  })

  const openDetails = (item: Appointment) => {
    setSelectedAppt(item)
    setSheetOpen(true)
  }

  const counts = useMemo(() => ({
    all: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  }), [appointments])

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return appointments
    return appointments.filter((a) => a.status === statusFilter)
  }, [appointments, statusFilter])

  const columns = useMemo(
    () =>
      getAppointmentColumns({
        onStatusChange: (id, status) => statusMutation.mutate({ id, status }),
        onOpenDetails: openDetails,
        isPending: statusMutation.isPending,
      }),
    [statusMutation]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-3">
      {/* Filter Tabs with Dynamic Counters */}
      {!hideFilters && (
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  statusFilter === tab
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Single Card Container */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-xs">
        {rows.length === 0 ? (
          <div className="p-6 text-center">
            <EmptyState
              icon={CalendarX}
              title={
                statusFilter !== 'all'
                  ? `No ${statusFilter} Appointments`
                  : 'No Appointments Recorded'
              }
              description={
                statusFilter !== 'all'
                  ? `No appointments currently marked as "${statusFilter}".`
                  : 'No test-drive bookings have been scheduled yet.'
              }
              action={
                statusFilter !== 'all'
                  ? {
                      label: 'Show All Bookings',
                      onClick: () => setStatusFilter('all'),
                      variant: 'outline',
                    }
                  : undefined
              }
              compact
            />
          </div>
        ) : (
          <>
            {/* Mobile View: Clean Card List (Zero Horizontal Overflow) */}
            <div className="md:hidden divide-y divide-border/40">
              {rows.map((row) => (
                <AppointmentMobileCard
                  key={row.id}
                  appointment={row.original}
                  onStatusChange={(id, status) =>
                    statusMutation.mutate({ id, status })
                  }
                  onSelect={openDetails}
                />
              ))}
            </div>

            {/* Desktop View: Full Tabular Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-muted/40 text-xs font-semibold">
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className="hover:bg-transparent">
                      {hg.headers.map((h) => (
                        <TableHead key={h.id} className="py-2.5 px-3 text-xs">
                          {flexRender(h.column.columnDef.header, h.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => openDetails(row.original)}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2.5 px-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>

      <AppointmentDetailSheet
        appointment={selectedAppt}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onStatusChange={(id, status) => statusMutation.mutate({ id, status })}
        isUpdating={statusMutation.isPending}
      />
    </div>
  )
}
