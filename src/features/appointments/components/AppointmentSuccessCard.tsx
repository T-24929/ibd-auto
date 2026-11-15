import { useState } from 'react'
import type { Appointment } from '@/types/database.types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Ticket, Copy, Check, Search, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

interface AppointmentSuccessCardProps {
  appointment: Appointment | null
  onViewPass: () => void
  onTrackNow: () => void
}

export function AppointmentSuccessCard({
  appointment,
  onViewPass,
  onTrackNow,
}: AppointmentSuccessCardProps) {
  const [copied, setCopied] = useState(false)
  const refCode = appointment?.id || 'IBD-CONFIRMED'

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode)
    setCopied(true)
    toast.success('Reference Copied!', { description: `${refCode} saved to clipboard.` })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-6 rounded-2xl md:rounded-3xl border border-border/80 bg-card text-foreground text-center space-y-4 shadow-xl">
      <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
        <CheckCircle2 className="size-7" />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-lg sm:text-xl text-foreground">
          Inspection Visit Reserved!
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Your zero-obligation physical inspection & hoist test drive has been recorded in our showroom queue.
        </p>
      </div>

      {/* Pass Ref Box with 1-click Copy */}
      <div className="p-3.5 rounded-2xl bg-muted/40 border border-border text-left space-y-2 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-border/60">
          <span className="text-muted-foreground">Booking Reference:</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 font-mono font-bold text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer bg-background/80 px-2 py-0.5 rounded-md border border-border/60"
            title="Click to copy"
          >
            <span>{refCode}</span>
            {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3 text-muted-foreground" />}
          </button>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Vehicle:</span>
          <span className="font-semibold text-foreground truncate max-w-[200px]">{appointment?.vehicle?.title || 'Certified Vehicle'}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Scheduled Slot:</span>
          <span className="font-semibold text-foreground">{appointment?.preferred_date} • {appointment?.preferred_time}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] text-left">
        <ShieldCheck className="size-4 shrink-0" />
        <span>No advance payment needed. Present your reference at the Nugegoda showroom gate.</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <Button
          type="button"
          onClick={onViewPass}
          className="flex-1 rounded-xl h-10 text-xs font-semibold gap-1.5"
        >
          <Ticket className="size-3.5" />
          <span>View Gate Pass</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onTrackNow}
          className="flex-1 rounded-xl h-10 text-xs font-semibold gap-1.5"
        >
          <Search className="size-3.5" />
          <span>Track Status</span>
        </Button>
      </div>
    </Card>
  )
}
