import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/auth'
import { createAppointment } from '../api/appointments.api'
import { appointmentQueries } from '../api/appointments.queries'
import type { Appointment, Vehicle } from '@/types/database.types'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { X, Check } from 'lucide-react'
import { toast } from 'sonner'
import { AppointmentMiniVehicleCard } from './AppointmentMiniVehicleCard'
import { AppointmentStepSchedule, TIME_SLOTS } from './AppointmentStepSchedule'
import { AppointmentStepContact } from './AppointmentStepContact'
import { AppointmentStepSuccess } from './AppointmentStepSuccess'
import { InspectionPassModal } from '@/features/portal/components/InspectionPassModal'
import { cn } from '@/lib/utils'

interface AppointmentDrawerProps {
  vehicle: Vehicle
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AppointmentDrawer({
  vehicle,
  isOpen,
  onClose,
  onSuccess,
}: AppointmentDrawerProps) {
  const { user, profile } = useAuth()
  const queryClient = useQueryClient()

  // Stepper state: 1 = Schedule (Date/Time), 2 = Contact Details, 3 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Form values
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDateStr = tomorrow.toISOString().split('T')[0]

  const [date, setDate] = useState(defaultDateStr)
  const [time, setTime] = useState<string>(TIME_SLOTS[0])
  const [name, setName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [notes, setNotes] = useState('')

  const [bookedAppt, setBookedAppt] = useState<Appointment | null>(null)
  const [passOpen, setPassOpen] = useState(false)

  const bookingMutation = useMutation({
    mutationFn: async () => {
      const res = await createAppointment(
        {
          vehicle_id: vehicle.id,
          customer_name: name.trim(),
          customer_email: user?.email || `${phone.replace(/\D/g, '')}@buyer.lk`,
          customer_phone: phone.trim(),
          preferred_date: date,
          preferred_time: time,
          notes: notes.trim() || undefined,
        },
        user?.id
      )
      if (res.error) throw res.error
      return res.data
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: appointmentQueries.all })
      setBookedAppt(created)
      setStep(3)
      toast.success('Inspection Scheduled!', {
        description: `Booking ref: ${created?.id || 'Confirmed'}.`,
      })
      if (onSuccess) onSuccess()
    },
    onError: (err: any) => {
      toast.error('Booking failed', { description: err.message })
    },
  })

  const handleResetAndClose = () => {
    setStep(1)
    onClose()
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={(open) => {
        if (!open) handleResetAndClose()
      }}>
        <DrawerContent className="max-w-lg mx-auto rounded-t-3xl border-t border-border/80 bg-card p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto no-scrollbar">
          {/* Header Bar with Stepper and Close */}
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <DrawerTitle className="text-base sm:text-lg font-bold text-foreground">
              {step === 3 ? 'Booking Confirmed' : 'Schedule Inspection'}
            </DrawerTitle>

            <DrawerClose asChild>
              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close"
                className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </DrawerClose>
          </div>

          <div className="space-y-4 pt-3">
            {/* Simple Vehicle Mini Card (basic info only) */}
            <AppointmentMiniVehicleCard vehicle={vehicle} />

            {/* Stepper Progress Bar (Step 1 & 2) */}
            {step < 3 && (
              <div className="flex items-center justify-between px-1 py-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'size-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                    step === 1 ? 'bg-primary text-primary-foreground' : 'bg-emerald-600 text-white'
                  )}>
                    {step > 1 ? <Check className="size-3" /> : '1'}
                  </span>
                  <span className={step === 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                    Date & Time
                  </span>
                </div>

                <div className="h-px flex-1 mx-3 bg-border/60" />

                <div className="flex items-center gap-2">
                  <span className={cn(
                    'size-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                    step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}>
                    2
                  </span>
                  <span className={step === 2 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                    Contact Details
                  </span>
                </div>
              </div>
            )}

            {/* Step 1: Schedule Selection */}
            {step === 1 && (
              <AppointmentStepSchedule
                selectedDate={date}
                onSelectDate={setDate}
                selectedTime={time}
                onSelectTime={setTime}
                onNext={() => setStep(2)}
              />
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <AppointmentStepContact
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                notes={notes}
                setNotes={setNotes}
                onBack={() => setStep(1)}
                onSubmit={() => bookingMutation.mutate()}
                isSubmitting={bookingMutation.isPending}
              />
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <AppointmentStepSuccess
                appointment={bookedAppt}
                onViewPass={() => setPassOpen(true)}
                onClose={handleResetAndClose}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Gate Pass Modal */}
      {bookedAppt && (
        <InspectionPassModal
          appointment={bookedAppt}
          open={passOpen}
          onOpenChange={(open) => {
            setPassOpen(open)
            if (!open) handleResetAndClose()
          }}
        />
      )}
    </>
  )
}
