import { X, SlidersHorizontal, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatLKR } from '@/lib/formatters'
import type { VehicleFiltersState } from '../types/vehicle.types'

interface ActiveFilterPillsProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  onReset: () => void
}

export function ActiveFilterPills({
  filters,
  onUpdateFilters,
  onReset,
}: ActiveFilterPillsProps) {
  const activePills: { label: string; onRemove: () => void }[] = []

  if (filters.search) {
    activePills.push({
      label: `"${filters.search}"`,
      onRemove: () => onUpdateFilters({ search: '' }),
    })
  }
  if (filters.location && filters.location !== 'all') {
    activePills.push({
      label: filters.location,
      onRemove: () => onUpdateFilters({ location: 'all' }),
    })
  }
  if (filters.category && filters.category !== 'all') {
    activePills.push({
      label: filters.category.toUpperCase(),
      onRemove: () => onUpdateFilters({ category: 'all' }),
    })
  }
  if (filters.make && filters.make !== 'all') {
    activePills.push({
      label: filters.make,
      onRemove: () => onUpdateFilters({ make: 'all' }),
    })
  }
  if (filters.model && filters.model !== 'all') {
    activePills.push({
      label: filters.model,
      onRemove: () => onUpdateFilters({ model: 'all' }),
    })
  }
  if (filters.condition && filters.condition !== 'all') {
    activePills.push({
      label: filters.condition,
      onRemove: () => onUpdateFilters({ condition: 'all' }),
    })
  }
  if (filters.bodyType && filters.bodyType !== 'all') {
    activePills.push({
      label: filters.bodyType,
      onRemove: () => onUpdateFilters({ bodyType: 'all' }),
    })
  }
  if (filters.fuelType && filters.fuelType !== 'all') {
    activePills.push({
      label: filters.fuelType,
      onRemove: () => onUpdateFilters({ fuelType: 'all' }),
    })
  }
  if (filters.transmission && filters.transmission !== 'all') {
    activePills.push({
      label: filters.transmission,
      onRemove: () => onUpdateFilters({ transmission: 'all' }),
    })
  }
  if (filters.minPrice > 0) {
    activePills.push({
      label: `Min: ${formatLKR(filters.minPrice)}`,
      onRemove: () => onUpdateFilters({ minPrice: 0 }),
    })
  }
  if (filters.maxPrice < 100000000) {
    activePills.push({
      label: `Max: ${formatLKR(filters.maxPrice)}`,
      onRemove: () => onUpdateFilters({ maxPrice: 100000000 }),
    })
  }
  if (filters.maxMileage < 300000) {
    activePills.push({
      label: `< ${filters.maxMileage.toLocaleString()} km`,
      onRemove: () => onUpdateFilters({ maxMileage: 300000 }),
    })
  }

  if (activePills.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
        <SlidersHorizontal className="size-3" />
        <span>{activePills.length} active</span>
      </div>

      {activePills.map((pill, idx) => (
        <Badge
          key={idx}
          variant="secondary"
          className="rounded-xl px-2.5 py-1 text-xs font-medium flex items-center gap-1.5 bg-muted/80 hover:bg-muted text-foreground border border-border/50 group"
        >
          <span>{pill.label}</span>
          <button
            type="button"
            onClick={pill.onRemove}
            className="rounded-full p-0.5 hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
          >
            <X className="size-3" />
            <span className="sr-only">Remove {pill.label} filter</span>
          </button>
        </Badge>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="rounded-xl h-7 px-2 text-xs text-muted-foreground hover:text-destructive gap-1"
      >
        <RotateCcw className="size-3" />
        <span>Clear All</span>
      </Button>
    </div>
  )
}
