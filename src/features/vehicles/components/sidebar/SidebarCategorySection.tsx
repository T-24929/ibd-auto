import { ChevronDown } from 'lucide-react'
import type { VehicleFiltersState, Vehicle } from '../../types/vehicle.types'

interface SidebarCategorySectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  isOpen: boolean
  onToggle: () => void
  allVehicles: Vehicle[]
}

export function SidebarCategorySection({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle,
  allVehicles,
}: SidebarCategorySectionProps) {
  const carsCount = allVehicles.filter((v) =>
    ['sedan', 'hatchback', 'coupe', 'wagon'].includes(v.body_type.toLowerCase())
  ).length
  const suvCount = allVehicles.filter((v) =>
    v.body_type.toLowerCase().includes('suv')
  ).length
  const vanCount = allVehicles.filter((v) =>
    v.body_type.toLowerCase().includes('van')
  ).length
  const pickupCount = allVehicles.filter((v) =>
    ['truck', 'pickup'].includes(v.body_type.toLowerCase())
  ).length

  return (
    <div className="pt-3 space-y-2">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <span>All Categories</span>
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="space-y-1 pl-1">
          <button
            type="button"
            onClick={() => onUpdateFilters({ category: 'all' })}
            className={`w-full flex items-center justify-between py-1 px-2 rounded-lg transition-colors ${
              filters.category === 'all'
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <span>🚗 All Vehicles</span>
            <span className="font-mono text-[11px]">({allVehicles.length})</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdateFilters({ category: 'cars' })}
            className={`w-full flex items-center justify-between py-1 px-2 pl-4 rounded-lg transition-colors ${
              filters.category === 'cars'
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <span>Cars / Sedans</span>
            <span className="font-mono text-[11px]">({carsCount})</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdateFilters({ category: 'suvs' })}
            className={`w-full flex items-center justify-between py-1 px-2 pl-4 rounded-lg transition-colors ${
              filters.category === 'suvs'
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <span>SUVs & 4x4</span>
            <span className="font-mono text-[11px]">({suvCount})</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdateFilters({ category: 'vans' })}
            className={`w-full flex items-center justify-between py-1 px-2 pl-4 rounded-lg transition-colors ${
              filters.category === 'vans'
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <span>Vans & MPVs</span>
            <span className="font-mono text-[11px]">({vanCount})</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdateFilters({ category: 'pickups' })}
            className={`w-full flex items-center justify-between py-1 px-2 pl-4 rounded-lg transition-colors ${
              filters.category === 'pickups'
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <span>Pickups</span>
            <span className="font-mono text-[11px]">({pickupCount})</span>
          </button>
        </div>
      )}
    </div>
  )
}
