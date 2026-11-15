import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { lookupAppointment } from '../api/appointments.api'
import type { Appointment } from '@/types/database.types'
import { getWhatsAppUrl } from '@/lib/formatters'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import {
  Search,
  Loader2,
  Calendar,
  Clock,
  Ticket,
  Car,
  AlertCircle,
} from 'lucide-react'
import { EmptyState } from '@/components/feedback'

interface AppointmentTrackerTabProps {
  initialQuery?: string
  onViewPass: (appt: Appointment) => void
  onSwitchToBook: () => void
}

export function AppointmentTrackerTab({
  initialQuery = '',
  onViewPass,
  onSwitchToBook,
}: AppointmentTrackerTabProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(Boolean(initialQuery))
  const [result, setResult] = useState<Appointment | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setErrorMsg('')
    setSearched(true)
    setResult(null)

    try {
      const res = await lookupAppointment(query.trim())
      if (res.error) {
        setErrorMsg(res.error.message || 'Lookup failed')
      } else {
        setResult(res.data)
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with database')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">Confirmed • Ready for Visit</Badge>
      case 'completed':
        return <Badge className="bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-500/20 text-[10px]">Inspection Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-rose-600/15 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px]">Cancelled</Badge>
      default:
        return <Badge className="bg-amber-600/15 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]">Pending Confirmation</Badge>
    }
  }

  return (
    <div className="space-y-4 pt-1">
      {/* Lookup Bar */}
      <form onSubmit={handleTrack} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Booking Ref (IBD-APPT-...) or Phone"
            className="h-10 pl-9 rounded-xl bg-background border-border text-xs"
            autoFocus
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          size="sm"
          className="rounded-xl h-10 px-4 text-xs font-semibold shrink-0 gap-1.5"
        >
          {isLoading && <Loader2 className="size-3.5 animate-spin" />}
          <span>Track</span>
        </Button>
      </form>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="p-4 rounded-2xl border border-border/80 bg-muted/30 space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                Pass Ref #{result.id}
              </span>
              <p className="text-xs font-bold text-foreground">
                {result.vehicle?.title || 'Selected Vehicle'}
              </p>
            </div>
            {getStatusBadge(result.status)}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-3.5 text-primary" />
              <span className="text-foreground font-medium">{result.preferred_date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              <span className="text-foreground font-medium">{result.preferred_time}</span>
            </div>
          </div>

          {result.notes && (
            <p className="text-[11px] text-muted-foreground bg-background/60 p-2.5 rounded-xl border border-border/40">
              <strong className="text-foreground">Mechanic Note:</strong> {result.notes}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              size="sm"
              onClick={() => onViewPass(result)}
              className="flex-1 rounded-xl h-9 text-xs font-semibold gap-1.5"
            >
              <Ticket className="size-3.5" />
              <span>Show Gate Pass</span>
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-xl h-9 text-xs font-semibold gap-1.5"
            >
              <a
                href={getWhatsAppUrl('94779876543', `Hello, checking status for inspection pass ${result.id}`)}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon className="size-3.5 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {searched && !result && !errorMsg && !isLoading && (
        <EmptyState
          icon={Car}
          title="No Matching Booking Found"
          description={`We couldn't locate any inspection appointment matching "${query}". Double check the reference number or phone entered.`}
          action={{
            label: 'Book This Car Now',
            onClick: onSwitchToBook,
            icon: Calendar,
          }}
          compact
        />
      )}
    </div>
  )
}
