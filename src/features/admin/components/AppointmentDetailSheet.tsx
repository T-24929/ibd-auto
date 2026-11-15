import type { Appointment, AppointmentStatus } from '@/types/database.types'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  Car,
  User,
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { formatLKR } from '@/lib/formatters'

interface AppointmentDetailSheetProps {
  appointment: Appointment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (id: string, status: AppointmentStatus) => void
  isUpdating?: boolean
}

const STATUS_STYLES: Record<
  AppointmentStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  pending: {
    label: 'Pending Review',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
  },
  confirmed: {
    label: 'Confirmed Slot',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
  },
  completed: {
    label: 'Visit Completed',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-muted/80',
    text: 'text-muted-foreground',
    border: 'border-border/60',
  },
}

export function AppointmentDetailSheet({
  appointment: item,
  open,
  onOpenChange,
  onStatusChange,
  isUpdating = false,
}: AppointmentDetailSheetProps) {
  if (!item) return null

  const vehicle = item.vehicle
  const statusInfo = STATUS_STYLES[item.status] || STATUS_STYLES.pending
  const targetDate = item.preferred_date || 'Date to be confirmed'
  const targetTime = item.preferred_time || 'Flexible timing'

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-card border-l border-border/60 overflow-hidden"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-5 border-b border-border/50 shrink-0 text-left">
          <div className="flex items-center justify-between gap-3 pr-6">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
            >
              {statusInfo.label}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              ID: {item.id.slice(0, 8)}
            </span>
          </div>
          <SheetTitle className="text-lg font-bold text-foreground mt-2">
            Inspection Details
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Customer test drive and showroom verification booking.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Target Vehicle Summary */}
          {vehicle ? (
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5 space-y-3">
              <div className="flex items-start gap-3">
                {vehicle.images?.[0] ? (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    className="size-16 rounded-xl object-cover border border-border/40 shrink-0 bg-muted"
                  />
                ) : (
                  <div className="size-16 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center shrink-0">
                    <Car className="size-6 text-muted-foreground" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-xs text-foreground truncate">
                    {vehicle.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {vehicle.make} {vehicle.model}
                    {vehicle.reg_number ? ` • ${vehicle.reg_number}` : ''}
                  </p>
                  <p className="text-xs font-bold text-foreground mt-1">
                    {formatLKR(vehicle.price)}
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs rounded-xl gap-1.5 cursor-pointer"
              >
                <Link to="/vehicles/$id" params={{ id: vehicle.id }}>
                  <span>View Vehicle Page</span>
                  <ExternalLink className="size-3" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center gap-2">
              <Car className="size-4 text-muted-foreground" />
              <span>General Showroom Consultation (No specific vehicle)</span>
            </div>
          )}

          {/* Customer Information Card */}
          <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <User className="size-3.5 text-primary" />
              <span>Customer Information</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Name
                </span>
                <span className="font-medium text-foreground truncate block mt-0.5">
                  {item.customer_name}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Phone
                </span>
                <a
                  href={`tel:${item.customer_phone}`}
                  className="font-medium text-primary hover:underline truncate block mt-0.5"
                >
                  {item.customer_phone}
                </a>
              </div>
            </div>

            {item.customer_email && (
              <div className="pt-2 border-t border-border/40 text-xs">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Email
                </span>
                <a
                  href={`mailto:${item.customer_email}`}
                  className="font-medium text-muted-foreground hover:text-foreground hover:underline truncate block mt-0.5"
                >
                  {item.customer_email}
                </a>
              </div>
            )}

            {/* Quick Contact Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="flex-1 h-8 rounded-xl text-xs gap-1.5 cursor-pointer"
              >
                <a href={`tel:${item.customer_phone}`}>
                  <Phone className="size-3 text-primary" />
                  <span>Call Buyer</span>
                </a>
              </Button>
              {item.customer_email && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 rounded-xl text-xs gap-1.5 cursor-pointer"
                >
                  <a href={`mailto:${item.customer_email}`}>
                    <Mail className="size-3 text-muted-foreground" />
                    <span>Email</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Scheduled Slot Details */}
          <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Clock className="size-3.5 text-primary" />
              <span>Inspection Schedule</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Date
                </span>
                <div className="flex items-center gap-1.5 font-medium text-foreground mt-0.5">
                  <Calendar className="size-3 text-muted-foreground" />
                  <span>{targetDate}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Time Window
                </span>
                <div className="flex items-center gap-1.5 font-medium text-foreground mt-0.5">
                  <Clock className="size-3 text-muted-foreground" />
                  <span>{targetTime}</span>
                </div>
              </div>
            </div>

            {item.notes && (
              <div className="pt-2 border-t border-border/40 text-xs">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                  <FileText className="size-3" />
                  <span>Buyer Notes / Special Requests</span>
                </span>
                <p className="text-muted-foreground bg-muted/30 p-2.5 rounded-xl leading-relaxed italic text-[11px]">
                  "{item.notes}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border/50 bg-card/60 backdrop-blur-xs shrink-0 flex items-center gap-2">
          {item.status === 'pending' && (
            <>
              <Button
                type="button"
                size="sm"
                disabled={isUpdating}
                onClick={() => onStatusChange(item.id, 'confirmed')}
                className="flex-1 h-9 rounded-xl text-xs font-semibold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Confirm Slot</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUpdating}
                onClick={() => onStatusChange(item.id, 'cancelled')}
                className="h-9 px-3 rounded-xl text-xs text-muted-foreground hover:text-destructive cursor-pointer"
              >
                <XCircle className="size-3.5" />
                <span className="hidden sm:inline">Decline</span>
              </Button>
            </>
          )}

          {item.status === 'confirmed' && (
            <>
              <Button
                type="button"
                size="sm"
                disabled={isUpdating}
                onClick={() => onStatusChange(item.id, 'completed')}
                className="flex-1 h-9 rounded-xl text-xs font-semibold gap-1.5 bg-primary cursor-pointer"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Mark Visit Completed</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUpdating}
                onClick={() => onStatusChange(item.id, 'cancelled')}
                className="h-9 px-3 rounded-xl text-xs text-muted-foreground hover:text-destructive cursor-pointer"
              >
                Cancel
              </Button>
            </>
          )}

          {(item.status === 'completed' || item.status === 'cancelled') && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUpdating}
              onClick={() => onStatusChange(item.id, 'pending')}
              className="w-full h-9 rounded-xl text-xs cursor-pointer text-muted-foreground hover:text-foreground"
            >
              Reopen Booking as Pending
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
