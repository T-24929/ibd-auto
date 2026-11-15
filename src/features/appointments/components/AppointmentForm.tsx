import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/auth'
import { createAppointment } from '../api/appointments.api'
import { appointmentQueries } from '../api/appointments.queries'
import type { Appointment, Vehicle } from '@/types/database.types'
import { AppointmentModalHeader, type ModalTab } from './AppointmentModalHeader'
import { AppointmentFormInputs, TIME_SLOTS } from './AppointmentFormInputs'
import { AppointmentSuccessCard } from './AppointmentSuccessCard'
import { AppointmentTrackerTab } from './AppointmentTrackerTab'
import { InspectionPassModal } from '@/features/portal/components/InspectionPassModal'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CalendarCheck, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface AppointmentFormProps {
  vehicle: Vehicle
  onSuccess?: () => void
  onClose?: () => void
  initialTab?: ModalTab
}

export function AppointmentForm({
  vehicle,
  onSuccess,
  onClose,
  initialTab = 'book',
}: AppointmentFormProps) {
  const { user, profile } = useAuth()
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<ModalTab>(initialTab)
  const [isBooked, setIsBooked] = useState(false)
  const [bookedAppt, setBookedAppt] = useState<Appointment | null>(null)
  const [passAppt, setPassAppt] = useState<Appointment | null>(null)
  const [passOpen, setPassOpen] = useState(false)
  const [trackQuery, setTrackQuery] = useState('')

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDateStr = tomorrow.toISOString().split('T')[0]

  const bookingMutation = useMutation({
    mutationFn: async (values: {
      name: string
      email: string
      phone: string
      date: string
      time: string
      notes: string
    }) => {
      const res = await createAppointment(
        {
          vehicle_id: vehicle.id,
          customer_name: values.name,
          customer_email: values.email || `${values.phone.replace(/\D/g, '')}@buyer.lk`,
          customer_phone: values.phone,
          preferred_date: values.date,
          preferred_time: values.time,
          notes: values.notes || undefined,
        },
        user?.id
      )
      if (res.error) throw res.error
      return res.data
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: appointmentQueries.all })
      setBookedAppt(created)
      setPassAppt(created)
      setIsBooked(true)
      toast.success('Inspection Scheduled!', {
        description: `Booking ref: ${created?.id || 'Confirmed'}.`,
      })
      if (onSuccess) onSuccess()
    },
    onError: (err: any) => {
      toast.error('Booking failed', { description: err.message })
    },
  })

  const form = useForm({
    defaultValues: {
      name: profile?.full_name || '',
      email: user?.email || '',
      phone: profile?.phone || '',
      date: defaultDateStr,
      time: TIME_SLOTS[0],
      notes: '',
    },
    onSubmit: async ({ value }) => {
      bookingMutation.mutate(value)
    },
  })

  const handleOpenPass = (appt: Appointment) => {
    setPassAppt(appt)
    setPassOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
      aria-labelledby="book-inspection-title"
      aria-describedby="book-inspection-desc"
      className="relative w-full max-w-md mx-auto rounded-3xl bg-card/95 text-foreground border border-border/80 p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-2xl space-y-3.5 overscroll-contain max-h-[92vh] overflow-y-auto no-scrollbar"
    >
      {/* Header with Vehicle Context and Mode Switcher */}
      <AppointmentModalHeader
        vehicle={vehicle}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onClose={onClose}
      />

      {/* Tab 1: Book Inspection Form */}
      {activeTab === 'book' && (
        <>
          {isBooked ? (
            <AppointmentSuccessCard
              appointment={bookedAppt}
              onViewPass={() => bookedAppt && handleOpenPass(bookedAppt)}
              onTrackNow={() => {
                setTrackQuery(bookedAppt?.id || '')
                setActiveTab('track')
              }}
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-3.5"
            >
              <AppointmentFormInputs form={form} />

              <div className="pt-1 space-y-2">
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full h-10 rounded-xl font-semibold text-xs sm:text-sm gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {bookingMutation.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Reserving Slot...</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="size-4" />
                      <span>Confirm Free Inspection</span>
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('track')}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Already booked? Track status →
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      )}

      {/* Tab 2: Track Existing Booking or Inquiry */}
      {activeTab === 'track' && (
        <AppointmentTrackerTab
          initialQuery={trackQuery}
          onViewPass={handleOpenPass}
          onSwitchToBook={() => setActiveTab('book')}
        />
      )}

      {/* Official Inspection Gate Pass Modal */}
      <InspectionPassModal
        appointment={passAppt}
        open={passOpen}
        onOpenChange={setPassOpen}
      />
    </motion.div>
  )
}
