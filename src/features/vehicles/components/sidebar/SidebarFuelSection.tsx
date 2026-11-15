import { ChevronDown, Zap, Leaf, Fuel, Gauge } from 'lucide-react'
import type { VehicleFiltersState } from '../../types/vehicle.types'

interface SidebarFuelSectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  isOpen: boolean
  onToggle: () => void
}

const FUEL_OPTIONS = [
  { id: 'Hybrid', label: 'Hybrid', icon: Leaf },
  { id: 'Electric', label: 'Electric', icon: Zap },
  { id: 'Petrol', label: 'Petrol', icon: Fuel },
  { id: 'Diesel', label: 'Diesel', icon: Gauge },
]

export function SidebarFuelSection({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle,
}: SidebarFuelSectionProps) {
  const isFiltered = filters.fuelType !== 'all'

  return (
    <div className="pt-3.5 space-y-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-semibold text-foreground/90 hover:text-foreground transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md py-0.5"
      >
        <span className="flex items-center gap-2">
          <span>Fuel & Powertrain</span>
          {isFiltered && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              {filters.fuelType}
            </span>
          )}
        </span>
        <ChevronDown
          className={`size-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => onUpdateFilters({ fuelType: 'all' })}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
              filters.fuelType === 'all'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            Any
          </button>
          {FUEL_OPTIONS.map((item) => {
            const Icon = item.icon
            const isSelected =
              filters.fuelType.toLowerCase() === item.id.toLowerCase()

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onUpdateFilters({
                    fuelType: isSelected ? 'all' : item.id,
                  })
                }
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="size-3" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
