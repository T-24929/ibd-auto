import type { Appointment, AppointmentStatus } from '@/types/database.types'
import { Phone, Clock, Calendar, Car, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AppointmentMobileCardProps {
  appointment: Appointment
  onStatusChange: (id: string, status: AppointmentStatus) => void
  onSelect?: (appointment: Appointment) => void
}

export function AppointmentMobileCard({
  appointment: item,
  onStatusChange,
  onSelect,
}: AppointmentMobileCardProps) {
  const slotDate = item.preferred_date || 'Date TBD'
  const slotTime = item.preferred_time || 'Time TBD'

  return (
    <div
      onClick={() => onSelect?.(item)}
      className="p-3.5 space-y-2.5 hover:bg-muted/20 active:bg-muted/30 transition-colors cursor-pointer select-none"
    >
      {/* Top Meta Row: Date & Time + Status Pill */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
          <Calendar className="size-3 text-muted-foreground" />
          <span>{slotDate}</span>
          <span className="text-muted-foreground">•</span>
          <Clock className="size-3 text-muted-foreground" />
          <span>{slotTime}</span>
        </div>

        {/* Status Dropdown (stops propagation so row click doesn't clash) */}
        <div onClick={(e) => e.stopPropagation()}>
          <select
            value={item.status}
            onChange={(e) =>
              onStatusChange(item.id, e.target.value as AppointmentStatus)
            }
            className={`text-[11px] rounded-lg px-2 py-0.5 font-semibold border cursor-pointer focus:outline-none shrink-0 capitalize ${
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
      </div>

      {/* Customer Info & Vehicle */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-xs text-foreground block truncate">
            {item.customer_name}
          </span>
          <span className="text-[11px] text-muted-foreground block truncate mt-0.5">
            {item.customer_phone}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-right min-w-0 max-w-[50%]">
          <Car className="size-3.5 text-primary shrink-0" />
          <span className="text-[11px] font-medium text-foreground truncate block">
            {item.vehicle?.title || 'General Consultation'}
          </span>
          <ChevronRight className="size-3 text-muted-foreground shrink-0" />
        </div>
      </div>

      {/* Notes if provided */}
      {item.notes && (
        <p className="text-[10px] text-muted-foreground italic bg-muted/20 px-2 py-1 rounded-md truncate">
          "{item.notes}"
        </p>
      )}

      {/* Quick Call Action (Stops propagation) */}
      <div
        className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={`tel:${item.customer_phone}`}
          className="inline-flex items-center gap-1 text-primary hover:underline font-medium py-0.5"
        >
          <Phone className="size-2.5" />
          <span>Call Customer</span>
        </a>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onSelect?.(item)}
          className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
        >
          View Full Details →
        </Button>
      </div>
    </div>
  )
}
