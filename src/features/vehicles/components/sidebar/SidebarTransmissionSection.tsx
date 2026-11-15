import { ChevronDown } from 'lucide-react'
import type { VehicleFiltersState } from '../../types/vehicle.types'

interface SidebarTransmissionSectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  isOpen: boolean
  onToggle: () => void
}

const TRANSMISSIONS = ['Automatic', 'Manual', 'Tiptronic']
const CONDITIONS = ['Used', 'Reconditioned', 'Brand New']

export function SidebarTransmissionSection({
  filters,
  onUpdateFilters,
  isOpen,
  onToggle,
}: SidebarTransmissionSectionProps) {
  const isTransmissionFiltered = filters.transmission !== 'all'
  const isConditionFiltered = filters.condition !== 'all'
  const hasActive = isTransmissionFiltered || isConditionFiltered

  return (
    <div className="pt-3.5 space-y-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-xs font-semibold text-foreground/90 hover:text-foreground transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md py-0.5"
      >
        <span className="flex items-center gap-2">
          <span>Gearbox & Condition</span>
          {hasActive && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              {isTransmissionFiltered && isConditionFiltered
                ? '2 Active'
                : isTransmissionFiltered
                ? filters.transmission
                : filters.condition}
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
          {/* Transmission */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-muted-foreground font-medium block">
              Transmission
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onUpdateFilters({ transmission: 'all' })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                  filters.transmission === 'all'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Any
              </button>
              {TRANSMISSIONS.map((t) => {
                const isSelected =
                  filters.transmission.toLowerCase() === t.toLowerCase()
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      onUpdateFilters({
                        transmission: isSelected ? 'all' : t,
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-1.5 pt-1 border-t border-border/40">
            <span className="text-[11px] text-muted-foreground font-medium block">
              Vehicle Condition
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onUpdateFilters({ condition: 'all' })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                  filters.condition === 'all'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                Any
              </button>
              {CONDITIONS.map((c) => {
                const isSelected =
                  filters.condition.toLowerCase() === c.toLowerCase()
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() =>
                      onUpdateFilters({
                        condition: isSelected ? 'all' : c,
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.97] ${
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
