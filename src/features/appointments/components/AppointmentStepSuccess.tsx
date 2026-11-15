import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { CheckCircle2, Ticket, Copy, Check, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { Appointment } from '@/types/database.types'

interface AppointmentStepSuccessProps {
  appointment: Appointment | null
  onViewPass: () => void
  onClose: () => void
}

export function AppointmentStepSuccess({
  appointment,
  onViewPass,
  onClose,
}: AppointmentStepSuccessProps) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const refCode = appointment?.id || 'IBD-CONFIRMED'

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode)
    setCopied(true)
    toast.success('Reference Copied!', { description: `${refCode} saved to clipboard.` })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGoToPortal = () => {
    onClose()
    navigate({ to: '/portal' })
  }

  return (
    <div className="space-y-4 text-center py-2">
      <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
        <CheckCircle2 className="size-6" />
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg sm:text-xl text-foreground">
          Inspection Visit Reserved!
        </h3>
        <p className="text-xs text-muted-foreground">
          Your free physical inspection & hoist test drive has been booked.
        </p>
      </div>

      {/* Confirmation Summary Card */}
      <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 text-left space-y-2 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-border/40">
          <span className="text-muted-foreground">Booking Reference:</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 font-mono font-bold text-xs text-primary bg-background/80 px-2 py-0.5 rounded-md border border-border/60 hover:bg-muted transition-colors cursor-pointer"
          >
            <span>{refCode}</span>
            {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3 text-muted-foreground" />}
          </button>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Scheduled Time:</span>
          <span className="font-semibold text-foreground">
            {appointment?.preferred_date} • {appointment?.preferred_time}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Location:</span>
          <span className="font-semibold text-foreground flex items-center gap-1">
            <MapPin className="size-3 text-primary" />
            <span>Colombo 03 Main Showroom</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <Button
          type="button"
          onClick={handleGoToPortal}
          className="flex-1 rounded-xl h-11 text-xs font-semibold gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Go to Buyer Portal</span>
          <ArrowRight className="size-3.5" />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onViewPass}
          className="flex-1 rounded-xl h-11 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <Ticket className="size-4" />
          <span>View Gate Pass</span>
        </Button>
      </div>
    </div>
  )
}
