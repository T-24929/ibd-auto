import { Link } from '@tanstack/react-router'
import { useVehicles } from '@/features/vehicles'
import { VehicleCard } from '@/features/vehicles/components/VehicleCard'
import { ArrowRight, Car } from 'lucide-react'

export function FeaturedVehicles() {
  const { allVehicles, isLoading } = useVehicles()
  const spotlightId = 'e6774db1-78c3-407e-961a-3d9a0fcda4e4'
  const featuredList = allVehicles.filter((v) => v.id !== spotlightId).slice(0, 6)

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Header Row: "Latest arrivals" + Link to All Vehicles */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Latest arrivals
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspected and available in our Colombo showroom today.
          </p>
        </div>

        <Link
          to="/vehicles"
          viewTransition
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground/80 hover:text-foreground transition-colors shrink-0 group"
        >
          <span>View all {allVehicles.length > 0 ? `(${allVehicles.length})` : ''}</span>
          <ArrowRight className="size-3.5 sm:size-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 sm:h-96 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {featuredList.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}

      {/* Full Inventory Redirect Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-gradient-to-r from-card to-muted/40 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Car className="size-4" />
            </span>
            <h4 className="font-semibold text-base sm:text-lg text-foreground">
              Looking for a different make, budget, or body style?
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-9">
            Explore our complete collection of {allVehicles.length}+ certified pre-owned and brand-new vehicles with verified DMT title books.
          </p>
        </div>

        <Link
          to="/vehicles"
          viewTransition
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl sm:rounded-2xl bg-foreground text-background hover:opacity-90 font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-sm shrink-0 self-start sm:self-auto"
        >
          <span>Browse All {allVehicles.length}+ Vehicles</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
