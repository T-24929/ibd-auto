import { ChevronDown, MapPin } from 'lucide-react'
import type { VehicleFiltersState } from '../../types/vehicle.types'

interface SidebarLocationSectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  isOpen: boolean
  onToggle: () => void
}

const POPULAR_DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kandy',
  'Kalutara',
  'Kurunegala',
  'Galle',
  'Matara',
  'Negombo',
]

const ALL_DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
]

export function SidebarLocationSection({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle,
}: SidebarLocationSectionProps) {
  const isFiltered = filters.location !== 'all'

  return (
    <div className="pt-3.5 space-y-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-semibold text-foreground/90 hover:text-foreground transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md py-0.5"
      >
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" />
            <span>District / Location</span>
          </span>
          {isFiltered && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              {filters.location}
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
          {/* Quick Hub Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateFilters({ location: 'all' })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                filters.location === 'all'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              All Sri Lanka
            </button>
            {POPULAR_DISTRICTS.map((d) => {
              const isSelected =
                filters.location.toLowerCase().includes(d.toLowerCase())

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() =>
                    onUpdateFilters({ location: isSelected ? 'all' : d })
                  }
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {d}
                </button>
              )
            })}
          </div>

          {/* More Districts Dropdown */}
          <div className="pt-1 border-t border-border/40">
            <label className="text-[10px] text-muted-foreground font-medium block mb-1">
              Select other district
            </label>
            <select
              value={filters.location}
              onChange={(e) => onUpdateFilters({ location: e.target.value })}
              className="w-full h-8 px-2 rounded-lg bg-background border border-input text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
            >
              <option value="all">All 25 Districts</option>
              {ALL_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
