import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Car, ArrowRight } from 'lucide-react'

interface PortalEmptyStateProps {
  onSwitchToTrack?: () => void
}

export function PortalEmptyState({ onSwitchToTrack }: PortalEmptyStateProps) {
  return (
    <Card className="rounded-2xl border border-border/50 bg-card/75 backdrop-blur-md p-8 sm:p-10 text-center max-w-xl mx-auto space-y-5 shadow-xs">
      <div className="mx-auto size-12 rounded-2xl bg-muted/80 flex items-center justify-center text-foreground">
        <Car className="size-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          No Inspections Scheduled
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Reserve any verified vehicle in our showroom for a free hoist inspection and open-road test drive.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2.5 pt-1">
        <Button
          asChild
          size="sm"
          className="rounded-xl h-9 px-4 text-xs font-semibold gap-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
        >
          <Link to="/vehicles">
            <span>Browse Showroom</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>

        {onSwitchToTrack && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSwitchToTrack}
            className="rounded-xl h-9 px-3.5 text-xs font-medium cursor-pointer"
          >
            Track Existing Booking
          </Button>
        )}
      </div>
    </Card>
  )
}
