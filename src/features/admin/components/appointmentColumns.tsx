import type { ColumnDef } from '@tanstack/react-table'
import type { Appointment, AppointmentStatus } from '@/types/database.types'
import { Calendar, Phone, Mail, Clock, Car, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GetAppointmentColumnsProps {
  onStatusChange: (id: string, status: AppointmentStatus) => void
  onOpenDetails: (item: Appointment) => void
  isPending: boolean
}

export function getAppointmentColumns({
  onStatusChange,
  onOpenDetails,
  isPending,
}: GetAppointmentColumnsProps): ColumnDef<Appointment>[] {
  return [
    {
      accessorKey: 'customer_name',
      header: 'Customer',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="space-y-0.5">
            <span className="font-semibold text-foreground text-xs block">
              {item.customer_name}
            </span>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="size-2.5 text-primary" />
                <a
                  href={`tel:${item.customer_phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  {item.customer_phone}
                </a>
              </span>
              {item.customer_email && (
                <span className="hidden sm:flex items-center gap-1">
                  <Mail className="size-2.5 text-primary" />
                  <span className="truncate max-w-[120px]">
                    {item.customer_email}
                  </span>
                </span>
              )}
            </div>
          </div>
        )
      },
    },
    {
      header: 'Target Vehicle',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="flex items-center gap-2 text-xs">
            <Car className="size-3.5 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="font-medium text-foreground block truncate max-w-[170px]">
                {item.vehicle?.title || 'General Consultation'}
              </span>
              {item.vehicle?.reg_number && (
                <span className="text-[10px] text-muted-foreground font-mono block">
                  {item.vehicle.reg_number}
                </span>
              )}
            </div>
          </div>
        )
      },
    },
    {
      header: 'Scheduled Slot',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center gap-1 text-foreground font-medium">
              <Calendar className="size-3 text-muted-foreground" />
              <span>{item.preferred_date || 'Date TBD'}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="size-2.5 text-muted-foreground" />
              <span>{item.preferred_time || 'Time TBD'}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <select
              value={item.status}
              disabled={isPending}
              onChange={(e) =>
                onStatusChange(item.id, e.target.value as AppointmentStatus)
              }
              className={`text-xs rounded-lg px-2 py-1 font-semibold border cursor-pointer focus:outline-none capitalize ${
                item.status === 'confirmed'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : item.status === 'pending'
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : item.status === 'completed'
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                      : 'bg-muted text-muted-foreground border-border/60'
              }`}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onOpenDetails(row.original)
            }}
            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            title="View full booking details"
          >
            <Eye className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ]
}
