import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Ticket, XCircle, AlertCircle } from 'lucide-react'
import { formatLKR } from '@/lib/formatters'
import { updateAppointmentStatus } from '@/features/appointments/api/appointments.api'
import { toast } from 'sonner'
import type { Appointment } from '@/types/database.types'
import { InspectionPassModal } from './InspectionPassModal'

interface AppointmentCardProps {
  appointment: Appointment
  onStatusChange?: () => void
}

export function AppointmentCard({ appointment, onStatusChange }: AppointmentCardProps) {
  const [passOpen, setPassOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this inspection appointment?')) return
    setIsCancelling(true)
    const { error } = await updateAppointmentStatus(appointment.id, 'cancelled')
    setIsCancelling(false)
    if (error) {
      toast.error('Failed to cancel appointment', { description: error.message })
    } else {
      toast.success('Appointment cancelled')
      if (onStatusChange) onStatusChange()
    }
  }

  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'confirmed':
        return <Badge className="bg-emerald-600 text-white font-semibold">Confirmed</Badge>
      case 'pending':
        return <Badge className="bg-amber-600 text-white font-semibold">Pending Review</Badge>
      case 'completed':
        return <Badge className="bg-blue-600 text-white font-semibold">Inspection Complete</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="text-destructive border-destructive/40">Cancelled</Badge>
    }
  }

  return (
    <>
      <Card className="p-5 md:p-6 rounded-2xl border-border/60 bg-card shadow-sm space-y-4 hover:border-primary/40 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-primary">
                REF: {appointment.id}
              </span>
              {getStatusBadge()}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Booked on {new Date(appointment.created_at).toLocaleDateString('en-GB')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPassOpen(true)}
              className="rounded-xl h-8 text-xs font-semibold gap-1.5 border-primary/40 text-primary hover:bg-primary/5"
            >
              <Ticket className="size-3.5" />
              <span>Inspection Pass</span>
            </Button>
          </div>
        </div>

        {/* Vehicle Summary Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {appointment.vehicle?.images?.[0] ? (
            <img
              src={appointment.vehicle.images[0]}
              alt={appointment.vehicle.title}
              className="w-full sm:w-28 h-24 object-cover rounded-xl border border-border/40 shrink-0"
            />
          ) : (
            <div className="w-full sm:w-28 h-24 bg-muted rounded-xl flex items-center justify-center shrink-0 text-muted-foreground text-xs">
              No Image
            </div>
          )}

          <div className="space-y-1.5 flex-1 min-w-0">
            <h4 className="font-semibold text-base text-foreground truncate">
              {appointment.vehicle?.title || 'Vehicle Details'}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {appointment.vehicle?.reg_number && (
                <Badge variant="outline" className="font-mono text-[10px] bg-muted/60">
                  Plate: {appointment.vehicle.reg_number}
                </Badge>
              )}
              {appointment.vehicle?.price && (
                <span className="font-semibold text-foreground">
                  {formatLKR(appointment.vehicle.price)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3 text-primary shrink-0" />
              <span className="truncate">{appointment.vehicle?.location || 'Colombo Main Showroom'}</span>
            </div>
          </div>
        </div>

        {/* Timing and Customer Note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-muted/30 p-3 rounded-xl border border-border/40">
          <div className="flex items-center gap-2">
            <Calendar className="size-3.5 text-primary shrink-0" />
            <span className="font-medium text-foreground">{appointment.preferred_date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-primary shrink-0" />
            <span className="font-medium text-foreground">{appointment.preferred_time}</span>
          </div>
          {appointment.notes && (
            <div className="sm:col-span-2 pt-1 border-t border-border/30 text-[11px] text-muted-foreground flex items-start gap-1.5">
              <AlertCircle className="size-3 text-primary shrink-0 mt-0.5" />
              <span>Note: {appointment.notes}</span>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
          <div className="flex justify-end pt-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={isCancelling}
              onClick={handleCancel}
              className="rounded-xl h-8 text-xs text-muted-foreground hover:text-destructive gap-1"
            >
              <XCircle className="size-3.5" />
              <span>Cancel Appointment</span>
            </Button>
          </div>
        )}
      </Card>

      <InspectionPassModal
        appointment={appointment}
        open={passOpen}
        onOpenChange={setPassOpen}
      />
    </>
  )
}
