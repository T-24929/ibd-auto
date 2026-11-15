import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, User, Phone, Check, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '02:00 PM',
  '04:30 PM',
]

const QUICK_REQUESTS = [
  'Bring my mechanic',
  'OBD-II scan report',
  'Trade-in valuation',
]

interface AppointmentFormInputsProps {
  form: any
}

export function AppointmentFormInputs({ form }: AppointmentFormInputsProps) {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [showCustomNotes, setShowCustomNotes] = useState(false)

  const getDateOffset = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  const toggleRequest = (req: string, field: any) => {
    let next: string[]
    if (selectedRequests.includes(req)) {
      next = selectedRequests.filter((r) => r !== req)
    } else {
      next = [...selectedRequests, req]
    }
    setSelectedRequests(next)
    field.handleChange(next.join(' • '))
  }

  return (
    <div className="space-y-3.5">
      {/* 1. Contact: Name & WhatsApp in compact 2-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }: { value: string }) =>
              !value ? 'Full name required' : undefined,
          }}
        >
          {(field: any) => (
            <div className="space-y-1">
              <Label
                htmlFor={field.name}
                className="text-xs font-semibold text-foreground flex items-center justify-between"
              >
                <span>Your Name</span>
                {field.state.meta.errors?.[0] && (
                  <span className="text-[10px] text-destructive font-normal">
                    {field.state.meta.errors[0]}
                  </span>
                )}
              </Label>
              <div className="relative flex items-center">
                <User className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Samantha Perera"
                  className="h-9 w-full pl-8.5 pr-2.5 rounded-xl bg-background border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>
          )}
        </form.Field>

        <form.Field
          name="phone"
          validators={{
            onChange: ({ value }: { value: string }) =>
              !value ? 'Phone required' : undefined,
          }}
        >
          {(field: any) => (
            <div className="space-y-1">
              <Label
                htmlFor={field.name}
                className="text-xs font-semibold text-foreground flex items-center justify-between"
              >
                <span>Phone / WhatsApp</span>
                {field.state.meta.errors?.[0] && (
                  <span className="text-[10px] text-destructive font-normal">
                    {field.state.meta.errors[0]}
                  </span>
                )}
              </Label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id={field.name}
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="077 123 4567"
                  className="h-9 w-full pl-8.5 pr-2.5 rounded-xl bg-background border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>
          )}
        </form.Field>
      </div>

      {/* 2. Date Selection with Fast Interactive Chips */}
      <form.Field name="date">
        {(field: any) => {
          const todayStr = getDateOffset(0)
          const tomorrowStr = getDateOffset(1)
          const dayAfterStr = getDateOffset(2)

          const isTomorrow = field.state.value === tomorrowStr
          const isDayAfter = field.state.value === dayAfterStr
          const isToday = field.state.value === todayStr

          return (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-foreground">
                  Select Day
                </Label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-2 size-3 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    min={todayStr}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-6 pl-6 pr-1 text-[11px] rounded-md bg-muted/60 border border-border/60 text-foreground cursor-pointer"
                  />
                </div>
              </div>

              {/* Fast Pills */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Today', val: todayStr, active: isToday },
                  { label: 'Tomorrow', val: tomorrowStr, active: isTomorrow },
                  { label: '+2 Days', val: dayAfterStr, active: isDayAfter },
                ].map((chip) => (
                  <motion.button
                    key={chip.label}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => field.handleChange(chip.val)}
                    className={cn(
                      'relative py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer',
                      chip.active
                        ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'border-border/70 bg-card hover:bg-muted/50 text-foreground/80'
                    )}
                  >
                    {chip.label}
                  </motion.button>
                ))}
              </div>
            </div>
          )
        }}
      </form.Field>

      {/* 3. Interactive Time Slots (Tactile Grid) */}
      <form.Field name="time">
        {(field: any) => (
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">
              Inspection Slot
            </Label>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.map((slot) => {
                const isSelected = field.state.value === slot

                return (
                  <motion.button
                    key={slot}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => field.handleChange(slot)}
                    className={cn(
                      'py-1.5 px-1 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer truncate',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'border-border/70 bg-card hover:bg-muted/50 text-foreground/80'
                    )}
                  >
                    {slot}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}
      </form.Field>

      {/* 4. Fast Request Chips */}
      <form.Field name="notes">
        {(field: any) => (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Preferences
              </span>
              <button
                type="button"
                onClick={() => setShowCustomNotes(!showCustomNotes)}
                className="text-[10px] text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                {showCustomNotes ? 'Hide custom note' : '+ Add custom note'}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {QUICK_REQUESTS.map((req) => {
                const isSelected = selectedRequests.includes(req)

                return (
                  <motion.button
                    key={req}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggleRequest(req, field)}
                    className={cn(
                      'inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer',
                      isSelected
                        ? 'border-primary/80 bg-primary/10 text-primary font-semibold'
                        : 'border-border/70 bg-card hover:bg-muted/50 text-muted-foreground'
                    )}
                  >
                    {isSelected && <Check className="size-3 text-primary stroke-[3]" />}
                    <span>{req}</span>
                  </motion.button>
                )
              })}
            </div>

            {showCustomNotes && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                type="text"
                placeholder="Any other notes or questions..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-8 w-full px-3 mt-1 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
              />
            )}
          </div>
        )}
      </form.Field>

      {/* 5. Minimal Assurance Strip */}
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
        <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
        <span>
          <strong className="text-foreground font-semibold">Zero deposit</strong> • Free hoist lift & test drive included.
        </span>
      </div>
    </div>
  )
}
