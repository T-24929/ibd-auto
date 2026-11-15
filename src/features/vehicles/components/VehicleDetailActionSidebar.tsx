import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SlideTextButton } from '@/components/kokonutui/slide-text-button'
import { SimilarVehiclesSidebar } from './SimilarVehiclesSidebar'
import type { Vehicle } from '@/types/database.types'
import { PhoneCall } from 'lucide-react'

interface VehicleDetailActionSidebarProps {
  vehicle: Vehicle
  onBookInspection: () => void
  onContactNow: () => void
}

export function VehicleDetailActionSidebar({
  vehicle,
  onBookInspection,
  onContactNow,
}: VehicleDetailActionSidebarProps) {
  return (
    <div className="space-y-5">
      {/* Test Drive & Inquiry Card */}
      <Card
        id="schedule-test-drive-card"
        className="p-6 rounded-2xl md:rounded-3xl border border-border/80 bg-card space-y-5 shadow-md hover:shadow-lg scroll-mt-24 transition-all duration-300"
      >
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground">
            Schedule a Test Drive
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Test drive or bring your mechanic to inspect on our hoist at{' '}
            {vehicle.location || 'our Colombo showroom'}. Free of charge.
          </p>
        </div>

        {/* 2 Main CTAs */}
        <div className="space-y-2.5">
          {/* Main CTA 1: Book Vehicle Inspection */}
          <SlideTextButton
            text="Book Vehicle Inspection"
            hoverText="Choose Date & Time Slot →"
            onClick={onBookInspection}
            className="w-full h-12 text-sm shadow-sm"
          />

          {/* Main CTA 2: Contact Now */}
          <Button
            type="button"
            variant="outline"
            onClick={onContactNow}
            className="w-full h-12 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm border-border/70 hover:bg-muted/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="size-4 text-primary" />
            <span>Contact Now</span>
          </Button>
        </div>

        {/* Quick Showroom Assurance */}
        <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Walk-ins & visits welcome</span>
          <span className="font-medium text-foreground/80">Mon – Sat 8:30 AM – 6:30 PM</span>
        </div>
      </Card>

      {/* Side Recommendation Cards: Similar in Our Showroom */}
      <SimilarVehiclesSidebar currentVehicle={vehicle} limit={3} />
    </div>
  )
}
