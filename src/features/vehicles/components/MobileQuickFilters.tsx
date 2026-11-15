import { SlidersHorizontal, Zap, Leaf } from 'lucide-react'
import type { VehicleFiltersState } from '../types/vehicle.types'

interface MobileQuickFiltersProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  onOpenDrawer: () => void
  activeCount: number
}

export function MobileQuickFilters({
  filters,
  onUpdateFilters,
  onOpenDrawer,
  activeCount,
}: MobileQuickFiltersProps) {
  const isUnder15M = filters.minPrice === 0 && filters.maxPrice === 15000000
  const is15Mto30M = filters.minPrice === 15000000 && filters.maxPrice === 30000000
  const isHybrid = filters.fuelType.toLowerCase() === 'hybrid'
  const isElectric = filters.fuelType.toLowerCase() === 'electric'
  const isAuto = filters.transmission.toLowerCase() === 'automatic'
  const isColombo = filters.location.toLowerCase() === 'colombo'

  return (
    <div className="lg:hidden w-full overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory touch-pan-x -mx-1 px-1">
      <div className="flex items-center gap-2 min-w-max py-1">
        {/* Main Filter Trigger */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="snap-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-xs font-semibold cursor-pointer touch-manipulation active:scale-[0.96] transition-transform"
        >
          <SlidersHorizontal className="size-3.5" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="size-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Quick Tiers */}
        <button
          type="button"
          onClick={() =>
            onUpdateFilters({
              minPrice: isUnder15M ? 0 : 0,
              maxPrice: isUnder15M ? 100000000 : 15000000,
            })
          }
          className={`snap-start px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer touch-manipulation active:scale-[0.96] ${
            isUnder15M
              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
              : 'bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
          }`}
        >
          &lt; 15M
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateFilters({
              minPrice: is15Mto30M ? 0 : 15000000,
              maxPrice: is15Mto30M ? 100000000 : 30000000,
            })
          }
          className={`snap-start px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer touch-manipulation active:scale-[0.96] ${
            is15Mto30M
              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
              : 'bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
          }`}
        >
          15M - 30M
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateFilters({
              fuelType: isHybrid ? 'all' : 'Hybrid',
            })
          }
          className={`snap-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer touch-manipulation active:scale-[0.96] ${
            isHybrid
              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
              : 'bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
          }`}
        >
          <Leaf className="size-3" />
          <span>Hybrid</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateFilters({
              fuelType: isElectric ? 'all' : 'Electric',
            })
          }
          className={`snap-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer touch-manipulation active:scale-[0.96] ${
            isElectric
              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
              : 'bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
          }`}
        >
          <Zap className="size-3" />
          <span>Electric</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateFilters({
              transmission: isAuto ? 'all' : 'Automatic',
            })
          }
          className={`snap-start px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer touch-manipulation active:scale-[0.96] ${
            isAuto
              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
              : 'bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
          }`}
        >
          Automatic
        </button>

        <button
          type="button"
          onClick={() =>
            onUpdateFilters({
              location: isColombo ? 'all' : 'Colombo',
            })
          }
          className={`snap-start px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer touch-manipulation active:scale-[0.96] ${
            isColombo
              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
              : 'bg-card text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground'
          }`}
        >
          Colombo
        </button>
      </div>
    </div>
  )
}
