import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { formatLKRInLakhs } from '@/lib/formatters'
import type { VehicleFiltersState } from '../../types/vehicle.types'

interface SidebarPriceSectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  isOpen: boolean
  onToggle: () => void
}

const PRICE_PRESETS = [
  { label: 'Any', min: 0, max: 100000000 },
  { label: '< 15M', min: 0, max: 15000000 },
  { label: '15M - 30M', min: 15000000, max: 30000000 },
  { label: '30M - 50M', min: 30000000, max: 50000000 },
  { label: '50M+', min: 50000000, max: 100000000 },
]

export function SidebarPriceSection({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle,
}: SidebarPriceSectionProps) {
  const activePreset = PRICE_PRESETS.find(
    (p) => p.min === filters.minPrice && p.max === filters.maxPrice
  )

  const hasFilter = filters.minPrice > 0 || filters.maxPrice < 100000000

  return (
    <div className="pt-3.5 space-y-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-semibold text-foreground/90 hover:text-foreground transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md py-0.5"
      >
        <span className="flex items-center gap-2">
          <span>Price Range</span>
          {hasFilter && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              {activePreset ? activePreset.label : 'Active'}
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
        <div className="space-y-3 pt-0.5">
          {/* Quick Preset Chips */}
          <div className="flex flex-wrap gap-1.5">
            {PRICE_PRESETS.map((preset) => {
              const isSelected =
                filters.minPrice === preset.min && filters.maxPrice === preset.max

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    onUpdateFilters({
                      minPrice: preset.min,
                      maxPrice: preset.max,
                    })
                  }
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>

          {/* Min & Max Inputs */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40">
            <div>
              <label className="text-[11px] text-muted-foreground font-medium block">
                Min Price
              </label>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={filters.minPrice > 0 ? filters.minPrice : ''}
                onChange={(e) =>
                  onUpdateFilters({
                    minPrice: e.target.value ? Number(e.target.value) : 0,
                  })
                }
                className="h-8 text-base sm:text-xs rounded-lg mt-1 bg-background"
              />
              {filters.minPrice > 0 && (
                <span className="text-[10px] text-primary font-mono block mt-0.5">
                  ≈ {formatLKRInLakhs(filters.minPrice)}
                </span>
              )}
            </div>

            <div>
              <label className="text-[11px] text-muted-foreground font-medium block">
                Max Price
              </label>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="100,000,000"
                value={filters.maxPrice < 100000000 ? filters.maxPrice : ''}
                onChange={(e) =>
                  onUpdateFilters({
                    maxPrice: e.target.value ? Number(e.target.value) : 100000000,
                  })
                }
                className="h-8 text-base sm:text-xs rounded-lg mt-1 bg-background"
              />
              {filters.maxPrice < 100000000 && (
                <span className="text-[10px] text-primary font-mono block mt-0.5">
                  ≈ {formatLKRInLakhs(filters.maxPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
