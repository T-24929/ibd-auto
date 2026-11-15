import { useState, useMemo } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { VehicleFiltersState, Vehicle } from '../../types/vehicle.types'

const POPULAR_MAKES = [
  'Toyota',
  'Honda',
  'Nissan',
  'Suzuki',
  'BMW',
  'Mercedes-Benz',
  'Land Rover',
  'Hyundai',
  'Mitsubishi',
  'Audi',
]

interface SidebarMakeSectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  isOpen: boolean
  onToggle: () => void
  allVehicles?: Vehicle[]
}

export function SidebarMakeSection({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle,
  allVehicles = [],
}: SidebarMakeSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Collect available makes from data and merge with popular
  const availableMakes = useMemo(() => {
    const set = new Set<string>(POPULAR_MAKES)
    allVehicles.forEach((v) => {
      if (v.make) set.add(v.make)
    })
    return Array.from(set)
  }, [allVehicles])

  const filteredMakes = useMemo(() => {
    if (!searchTerm.trim()) return availableMakes
    return availableMakes.filter((m) =>
      m.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
  }, [availableMakes, searchTerm])

  const isFiltered = filters.make !== 'all'

  return (
    <div className="pt-3.5 space-y-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-semibold text-foreground/90 hover:text-foreground transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md py-0.5"
      >
        <span className="flex items-center gap-2">
          <span>Make / Brand</span>
          {isFiltered && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              {filters.make}
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
        <div className="space-y-2.5 pt-0.5">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search make..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-7 text-xs pl-7 rounded-lg bg-background"
            />
          </div>

          {/* Makes Pill Grid */}
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => onUpdateFilters({ make: 'all' })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                filters.make === 'all'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              All Makes
            </button>
            {filteredMakes.map((brand) => {
              const isSelected =
                filters.make.toLowerCase() === brand.toLowerCase()

              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => onUpdateFilters({ make: isSelected ? 'all' : brand })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {brand}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
