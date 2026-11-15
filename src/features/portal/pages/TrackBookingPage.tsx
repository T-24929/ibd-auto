import { TrackLookupForm } from '../components/TrackLookupForm'
import { OwnershipStepTracker } from '../components/OwnershipStepTracker'
import { Compass } from 'lucide-react'

export function TrackBookingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Compass className="size-3.5" />
          <span>Real-time Status Tracking</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Track Your Inspection or Inquiry
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Enter your unique booking reference number or contact phone to check live showroom status, assigned specialist, and gate pass.
        </p>
      </div>

      <TrackLookupForm />

      <div className="pt-4 border-t border-border/50">
        <OwnershipStepTracker currentStage="INSPECTION" />
      </div>
    </div>
  )
}
