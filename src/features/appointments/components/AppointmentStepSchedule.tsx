import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '02:00 PM',
  '04:30 PM',
] as const

interface AppointmentStepScheduleProps {
  selectedDate: string
  onSelectDate: (date: string) => void
  selectedTime: string
  onSelectTime: (time: string) => void
  onNext: () => void
}

export function AppointmentStepSchedule({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  onNext,
}: AppointmentStepScheduleProps) {
  const getDateOffset = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  const todayStr = getDateOffset(0)
  const tomorrowStr = getDateOffset(1)
  const day2Str = getDateOffset(2)
  const day3Str = getDateOffset(3)

  const quickDates = [
    { label: 'Today', val: todayStr },
    { label: 'Tomorrow', val: tomorrowStr },
    { label: '+2 Days', val: day2Str },
    { label: '+3 Days', val: day3Str },
  ]

  return (
    <div className="space-y-4">
      {/* Date Picker Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Calendar className="size-3.5 text-primary" />
            <span>Select Inspection Date</span>
          </Label>

          {/* Native Date Picker for Custom Dates */}
          <div className="relative flex items-center">
            <input
              type="date"
              min={todayStr}
              value={selectedDate}
              onChange={(e) => onSelectDate(e.target.value)}
              className="h-7 px-2 text-xs rounded-lg bg-muted/60 border border-border/60 text-foreground cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Date Chips */}
        <div className="grid grid-cols-4 gap-2">
          {quickDates.map((chip) => {
            const isSelected = selectedDate === chip.val

            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => onSelectDate(chip.val)}
                className={cn(
                  'h-10 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex flex-col items-center justify-center',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'border-border/70 bg-card hover:bg-muted text-foreground/80'
                )}
              >
                <span>{chip.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Clock className="size-3.5 text-primary" />
          <span>Select Time Slot</span>
        </Label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedTime === slot

            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSelectTime(slot)}
                className={cn(
                  'h-11 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-center gap-1.5',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'border-border/70 bg-card hover:bg-muted text-foreground/80'
                )}
              >
                <Clock className="size-3" />
                <span>{slot}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Continue Action */}
      <div className="pt-2">
        <Button
          type="button"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="w-full h-11 rounded-xl font-semibold text-xs sm:text-sm gap-2 shadow-xs transition-all cursor-pointer"
        >
          <span>Continue to Your Details</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
