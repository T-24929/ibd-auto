import { useState } from 'react'
import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { VehicleFiltersState, Vehicle } from '../types/vehicle.types'
import { SidebarPriceSection } from './sidebar/SidebarPriceSection'
import { SidebarMakeSection } from './sidebar/SidebarMakeSection'
import { SidebarFuelSection } from './sidebar/SidebarFuelSection'
import { SidebarTransmissionSection } from './sidebar/SidebarTransmissionSection'
import { SidebarLocationSection } from './sidebar/SidebarLocationSection'

interface MarketplaceSidebarFiltersProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  onReset: () => void
  allVehicles: Vehicle[]
  className?: string
}

export function MarketplaceSidebarFilters({
  filters,
  onUpdateFilters,
  onReset,
  allVehicles,
  className = '',
}: MarketplaceSidebarFiltersProps) {
  const [openSections, setOpenSections] = useState({
    price: true,
    make: true,
    fuel: true,
    transmission: false,
    location: false,
  })

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

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
    <Card
      className={`rounded-2xl border-border/70 bg-card p-4 space-y-1 shadow-xs text-xs divide-y divide-border/40 ${className}`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <SlidersHorizontal className="size-3.5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">Filters</h3>
          </div>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>Clear all</span>
          </Button>
        ) : (
          <span className="text-[11px] text-muted-foreground/60">Showing all</span>
        )}
      </div>

      {/* 1. Price Range */}
      <SidebarPriceSection
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      />

      {/* 2. Make / Brand */}
      <SidebarMakeSection
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        isOpen={openSections.make}
        onToggle={() => toggleSection('make')}
        allVehicles={allVehicles}
      />

      {/* 3. Fuel & Powertrain */}
      <SidebarFuelSection
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        isOpen={openSections.fuel}
        onToggle={() => toggleSection('fuel')}
      />

      {/* 4. Transmission & Condition */}
      <SidebarTransmissionSection
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        isOpen={openSections.transmission}
        onToggle={() => toggleSection('transmission')}
      />

      {/* 5. Location / Districts */}
      <SidebarLocationSection
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        isOpen={openSections.location}
        onToggle={() => toggleSection('location')}
      />
    </Card>
  )
}
