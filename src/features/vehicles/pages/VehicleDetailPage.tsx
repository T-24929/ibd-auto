import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useVehicleDetail } from '../hooks/useVehicleDetail'
import { VehicleGallery } from '../components/VehicleGallery'
import { VehicleSpecs } from '../components/VehicleSpecs'
import { RelatedVehicles } from '../components/RelatedVehicles'
import { OwnershipRoadmap } from '../components/OwnershipRoadmap'
import { VehicleDetailHeader } from '../components/VehicleDetailHeader'
import { VehicleDetailActionSidebar } from '../components/VehicleDetailActionSidebar'
import { VehicleDetailStickyFAB } from '../components/VehicleDetailStickyFAB'
import { ContactNowDialog } from '../components/ContactNowDialog'
import { AppointmentDrawer } from '@/features/appointments'
import { ShieldCheck, Car, Phone } from 'lucide-react'
import { EmptyState, ErrorState } from '@/components/feedback'

export function VehicleDetailPage() {
  const params = useParams({ strict: false }) as { id?: string }
  const id = params.id
  const { vehicle, isLoading, error } = useVehicleDetail(id)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-6">
        <div className="h-8 bg-muted rounded-xl w-48 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-16/10 bg-muted rounded-3xl animate-pulse" />
            <div className="h-28 bg-muted rounded-2xl animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-muted rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <ErrorState
          title="Unable to Load Vehicle Details"
          description={error}
          onRetry={() => window.location.reload()}
          homeHref="/vehicles"
        />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <EmptyState
          icon={Car}
          title="Vehicle Listing Unavailable or Sold"
          description="This vehicle is no longer available in our active showroom stock. It may have been sold to a verified buyer, reserved for title transfer, or the link has changed."
          action={{
            label: 'Browse Available Showroom Cars',
            href: '/vehicles',
            icon: Car,
          }}
          secondaryAction={{
            label: 'Contact Showroom Desk',
            href: '/contact',
            icon: Phone,
          }}
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ viewTransitionName: `vehicle-card-${vehicle.id}` }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Clean Header */}
      <VehicleDetailHeader vehicle={vehicle} />

      {/* Main Grid: Gallery & Specs on Left, Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div id="vehicle-card-gallery">
            <VehicleGallery
              id={vehicle.id}
              images={vehicle.images}
              title={vehicle.title}
            />
          </div>

          {/* Vehicle Overview & Description (Elevated Card) */}
          <div
            id="vehicle-card-overview"
            className="rounded-2xl md:rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm space-y-3.5 scroll-mt-24"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Vehicle Overview</span>
              </h2>
            </div>

            <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
              {vehicle.description ||
                `Inspected and certified ${vehicle.year} ${vehicle.make} ${vehicle.model} in our Colombo showroom. Clean ownership registration, verified odometer, and complete mechanical diagnostic checklist on file. Available for hoist inspection and showroom test drive.`}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
              <span className="px-2.5 py-1 rounded-md bg-muted/70 border border-border/60 font-medium text-foreground">
                {vehicle.owners || '1st Owner'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-muted/70 border border-border/60 font-medium text-foreground">
                {vehicle.reg_number
                  ? `Reg: ${vehicle.reg_number}`
                  : 'Clear DMT Title'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-muted/70 border border-border/60 font-medium text-muted-foreground">
                150-Point Hoist Inspected
              </span>
            </div>
          </div>

          {/* Technical Specifications (Clean section without redundant outer card nesting) */}
          <div id="vehicle-card-specs" className="scroll-mt-24 pt-1">
            <VehicleSpecs vehicle={vehicle} />
          </div>
        </div>

        {/* Right Column (5 cols) - Sticky on Desktop Viewport */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-5">
          <VehicleDetailActionSidebar
            vehicle={vehicle}
            onBookInspection={() => setIsBookingOpen(true)}
            onContactNow={() => setIsContactOpen(true)}
          />
        </div>
      </div>

      {/* Booking Drawer (Mobile bottom sheet & desktop drawer) */}
      <AppointmentDrawer
        vehicle={vehicle}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Direct Contact Dialog */}
      <ContactNowDialog
        vehicle={vehicle}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Ownership Roadmap */}
      <div id="vehicle-card-roadmap" className="scroll-mt-24">
        <OwnershipRoadmap />
      </div>

      {/* Suggested & Related Vehicles (Article-Style Recommendations) */}
      <div id="vehicle-card-related" className="scroll-mt-24">
        <RelatedVehicles currentVehicle={vehicle} />
      </div>

      {/* Floating Action Bar (FAB) Synced with Cards & Scroll */}
      <VehicleDetailStickyFAB
        vehicle={vehicle}
        onBookInspection={() => setIsBookingOpen(true)}
        onContactNow={() => setIsContactOpen(true)}
      />
    </motion.div>
  )
}
