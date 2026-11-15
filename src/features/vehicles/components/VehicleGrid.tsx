import type { Vehicle } from '@/types/database.types'
import { VehicleCard } from './VehicleCard'
import { CarFront, RotateCcw } from 'lucide-react'
import { EmptyState } from '@/components/feedback'

interface VehicleGridProps {
  vehicles: Vehicle[]
  isLoading?: boolean
  onResetFilters?: () => void
}

export function VehicleGrid({ vehicles, isLoading, onResetFilters }: VehicleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-2xl md:rounded-3xl border border-border/40 bg-card/60 p-4 space-y-4"
          >
            <div className="aspect-[16/10] bg-muted rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-6 bg-muted rounded w-3/4" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="h-8 bg-muted rounded-lg" />
              <div className="h-8 bg-muted rounded-lg" />
            </div>
            <div className="h-10 bg-muted rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (vehicles.length === 0) {
    return (
      <EmptyState
        icon={CarFront}
        title="No Vehicles Match Your Search"
        description="We couldn't find any vehicles in our showroom matching your active filters. Try broadening your price range, clearing brand filters, or resetting your search."
        action={
          onResetFilters
            ? {
                label: 'Reset All Filters',
                onClick: onResetFilters,
                icon: RotateCcw,
              }
            : undefined
        }
        className="max-w-2xl mx-auto py-16"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
