import { useState } from 'react'
import LocationPicker from '@/components/kokonutui/location-picker'
import { Card } from '@/components/ui/card'
import { MapPin, Navigation, Clock, CheckCircle2 } from 'lucide-react'

export function ContactLocationMap() {
  const [confirmedLocation, setConfirmedLocation] = useState<string | null>(null)

  return (
    <Card className="rounded-2xl sm:rounded-3xl border-border/70 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MapPin className="size-4" />
            </span>
            <h3 className="font-semibold text-lg text-foreground">
              Main Showroom & Vehicle Inspection Center
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            148 Galle Road, Kollupitiya, Colombo 03, Sri Lanka
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open for Walk-in Visits
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/60">
            <Clock className="size-3.5 text-muted-foreground" />
            Mon–Sat: 8:30 AM – 6:30 PM
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Navigation className="size-3.5 text-primary" />
            Interactive Showroom & Inspection Bay Map
          </span>
          <span className="text-[11px] hidden sm:inline">
            Drag the pin to preview access points and pickup curbs
          </span>
        </div>

        <div className="w-full flex justify-center overflow-hidden rounded-2xl border border-border/60 shadow-sm bg-muted/20">
          <LocationPicker
            onConfirm={(pickup) => setConfirmedLocation(pickup.address)}
            confirmText="Confirm Meeting Point"
            confirmedText="Meeting Point Selected"
            className="w-full max-w-lg border-0 shadow-none bg-transparent"
          />
        </div>

        {confirmedLocation && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>
              Selected entry / curb: <strong className="font-medium">{confirmedLocation}</strong>. Our front desk concierge will meet you at this spot.
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
