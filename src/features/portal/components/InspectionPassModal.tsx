import { useNavigate } from '@tanstack/react-router'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, User, Car, QrCode, Printer, ArrowRight } from 'lucide-react'
import type { Appointment } from '@/types/database.types'

interface InspectionPassModalProps {
  appointment: Appointment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InspectionPassModal({ appointment, open, onOpenChange }: InspectionPassModalProps) {
  const navigate = useNavigate()
  if (!appointment) return null

  const handlePrint = () => {
    window.print()
  }

  const handleGoToPortal = () => {
    onOpenChange(false)
    navigate({ to: '/portal' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl md:rounded-3xl border border-border/80 bg-card shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Vehicle Inspection Pass</DialogTitle>
        </DialogHeader>

        {/* Header Ticket Banner */}
        <div className="bg-primary text-primary-foreground px-6 py-5 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 size-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest bg-white/15 text-white/90 px-2.5 py-0.5 rounded-full inline-block">
              Dealership Security Gate Pass
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">Showroom Inspection Pass</h3>
            <p className="text-xs text-white/80 font-mono tracking-wider">
              REF #{appointment.id}
            </p>
          </div>
        </div>

        {/* Ticket Details Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Status & Vehicle Info */}
          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/50 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Target Vehicle
              </span>
              <Badge
                className={
                  appointment.status === 'confirmed'
                    ? 'bg-emerald-600 text-white shrink-0'
                    : 'bg-amber-600 text-white shrink-0'
                }
              >
                {appointment.status.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Car className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm text-foreground truncate">
                  {appointment.vehicle?.title || 'Selected Showroom Car'}
                </h4>
                <p className="text-[11px] text-muted-foreground font-mono truncate">
                  Plate: {appointment.vehicle?.reg_number || 'WP CBR-xxxx'} • Grade: {appointment.vehicle?.grade || 'Verified'}
                </p>
              </div>
            </div>
          </div>

          {/* Time & Date Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3 text-primary" />
                Date
              </span>
              <p className="font-semibold text-foreground text-xs">{appointment.preferred_date}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                <Clock className="size-3 text-primary" />
                Time Slot
              </span>
              <p className="font-semibold text-foreground text-xs">{appointment.preferred_time}</p>
            </div>
          </div>

          {/* Customer & Location 2-Column Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-muted/20 border border-border/40 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <User className="size-3 text-primary" />
                Guest Holder
              </span>
              <p className="font-semibold text-foreground truncate">{appointment.customer_name}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <MapPin className="size-3 text-primary" />
                Inspection Showroom
              </span>
              <p className="font-semibold text-foreground truncate">
                {appointment.vehicle?.location || 'Colombo 03 Showroom'}
              </p>
            </div>
          </div>

          {/* Verification Barcode & Gate Instruction */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/50 border border-border/60">
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase block">
                Showroom Security Check
              </span>
              <p className="text-xs font-mono font-bold tracking-wider text-foreground">{appointment.id}</p>
              <p className="text-[10px] text-muted-foreground">Present along with Driving License</p>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <QrCode className="size-6" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex-1 rounded-xl h-10 gap-1.5 text-xs font-medium cursor-pointer"
            >
              <Printer className="size-3.5" />
              <span>Print Pass</span>
            </Button>
            <Button
              size="sm"
              onClick={handleGoToPortal}
              className="flex-1 rounded-xl h-10 gap-1.5 text-xs font-semibold shadow-sm cursor-pointer"
            >
              <span>View in Portal</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
