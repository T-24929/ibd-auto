import { SlidersHorizontal, RotateCcw, X } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import type { VehicleFiltersState, Vehicle } from '../types/vehicle.types'
import { MarketplaceSidebarFilters } from './MarketplaceSidebarFilters'

interface VehicleFilterDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  onReset: () => void
  allVehicles: Vehicle[]
  matchingCount: number
}

export function VehicleFilterDrawer({
  open,
  onOpenChange,
  filters,
  onUpdateFilters,
  onReset,
  allVehicles,
  matchingCount,
}: VehicleFilterDrawerProps) {
  const activeCount = [
    filters.make !== 'all',
    filters.model !== 'all',
    filters.category !== 'all',
    filters.condition !== 'all',
    filters.location !== 'all',
    filters.fuelType !== 'all',
    filters.transmission !== 'all',
    filters.minPrice > 0,
    filters.maxPrice < 100000000,
    Boolean(filters.search),
  ].filter(Boolean).length

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[88dvh] flex flex-col rounded-t-3xl border-t border-border/80 bg-background/95 backdrop-blur-md focus:outline-none">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* Drawer Header */}
        <DrawerHeader className="px-5 py-3 border-b border-border/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <SlidersHorizontal className="size-4" />
            </div>
            <div>
              <DrawerTitle className="text-base font-bold text-foreground">
                Filter Vehicles
              </DrawerTitle>
            </div>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                {activeCount} active
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="h-8 px-2.5 text-xs text-muted-foreground hover:text-destructive gap-1 rounded-xl cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </Button>
            )}
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Scrollable Filters Body */}
        <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
          <MarketplaceSidebarFilters
            filters={filters}
            onUpdateFilters={onUpdateFilters}
            onReset={onReset}
            allVehicles={allVehicles}
            className="border-none shadow-none p-0 bg-transparent"
          />
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-border/60 bg-background/90 backdrop-blur-md flex items-center gap-3 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={activeCount === 0}
            className="rounded-xl h-11 px-4 text-xs font-semibold shrink-0 cursor-pointer touch-manipulation active:scale-[0.98]"
          >
            Clear All
          </Button>

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl h-11 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/20 cursor-pointer touch-manipulation active:scale-[0.98]"
          >
            Show {matchingCount} {matchingCount === 1 ? 'Vehicle' : 'Vehicles'}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
