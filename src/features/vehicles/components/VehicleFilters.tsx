import type { VehicleFiltersState } from '../types/vehicle.types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

interface VehicleFiltersProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  onReset: () => void
  totalCount: number
}

const MAKES = ['all', 'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Ford']
const BODY_TYPES = ['all', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck']
const FUEL_TYPES = ['all', 'Petrol', 'Diesel', 'Hybrid', 'Electric']
const TRANSMISSIONS = ['all', 'Automatic', 'Manual']

export function VehicleFilters({
  filters,
  onUpdateFilters,
  onReset,
  totalCount,
}: VehicleFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-border/60 bg-card/80 backdrop-blur-md space-y-4">
      {/* Top Search Bar & Quick Toggles */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search make, model, specs, color..."
            value={filters.search}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
            className="pl-10 h-11 rounded-xl bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-xl h-11 px-4 gap-2 flex-1 md:flex-none border-border"
          >
            <SlidersHorizontal className="size-4" />
            <span>Filters</span>
            {(filters.make !== 'all' ||
              filters.bodyType !== 'all' ||
              filters.fuelType !== 'all' ||
              filters.transmission !== 'all' ||
              filters.maxPrice < 100000000) && (
              <span className="size-2 rounded-full bg-primary" />
            )}
          </Button>

          <select
            value={filters.sortBy}
            onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
            className="h-11 rounded-xl px-3 bg-background border border-input text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest Model</option>
            <option value="mileage-asc">Lowest Mileage</option>
          </select>
        </div>
      </div>

      {/* Expandable Advanced Filters */}
      {isExpanded && (
        <div className="pt-4 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in-50 duration-200">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Brand / Make
            </Label>
            <select
              value={filters.make}
              onChange={(e) => onUpdateFilters({ make: e.target.value })}
              className="w-full h-10 rounded-xl px-3 bg-background border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20"
            >
              {MAKES.map((m) => (
                <option key={m} value={m}>
                  {m === 'all' ? 'All Makes' : m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Body Style
            </Label>
            <select
              value={filters.bodyType}
              onChange={(e) => onUpdateFilters({ bodyType: e.target.value })}
              className="w-full h-10 rounded-xl px-3 bg-background border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20"
            >
              {BODY_TYPES.map((b) => (
                <option key={b} value={b}>
                  {b === 'all' ? 'All Body Types' : b}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Fuel Type
            </Label>
            <select
              value={filters.fuelType}
              onChange={(e) => onUpdateFilters({ fuelType: e.target.value })}
              className="w-full h-10 rounded-xl px-3 bg-background border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20"
            >
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>
                  {f === 'all' ? 'All Fuels' : f}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Transmission
            </Label>
            <select
              value={filters.transmission}
              onChange={(e) => onUpdateFilters({ transmission: e.target.value })}
              className="w-full h-10 rounded-xl px-3 bg-background border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20"
            >
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Transmissions' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Action Row */}
          <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              Showing <strong className="text-foreground">{totalCount}</strong> matching vehicle{totalCount === 1 ? '' : 's'}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="rounded-lg text-xs gap-1.5 h-8 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
