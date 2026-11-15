import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { VehicleFiltersState } from '../../types/vehicle.types'
import { SidebarPillsSection } from './SidebarPillsSection'

const MAKES = ['Toyota', 'Honda', 'Nissan', 'Suzuki', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Ford']
const TRANSMISSIONS = ['Automatic', 'Manual', 'Tiptronic']
const CONDITIONS = ['Used', 'Reconditioned', 'Brand New']
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']

interface SidebarSpecsSectionProps {
  filters: VehicleFiltersState
  onUpdateFilters: (updates: Partial<VehicleFiltersState>) => void
  openSections: {
    make: boolean
    price: boolean
    transmission: boolean
    condition: boolean
    fuel: boolean
  }
  toggleSection: (key: 'make' | 'price' | 'transmission' | 'condition' | 'fuel') => void
}

export function SidebarSpecsSection({
  filters,
  onUpdateFilters,
  openSections,
  toggleSection,
}: SidebarSpecsSectionProps) {
  return (
    <>
      {/* Manufacturer / Make */}
      <div className="pt-3 space-y-2">
        <button
          type="button"
          onClick={() => toggleSection('make')}
          className="w-full flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <span>Manufacturer / Make</span>
          <ChevronDown
            className={`size-3.5 transition-transform ${openSections.make ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.make && (
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => onUpdateFilters({ make: 'all' })}
              className={`w-full text-left py-1 px-2 rounded-lg transition-colors ${
                filters.make === 'all'
                  ? 'bg-primary/10 font-semibold text-primary'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              All Brands
            </button>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {MAKES.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => onUpdateFilters({ make: brand })}
                  className={`text-left py-1 px-2 rounded-md transition-colors text-[11px] truncate ${
                    filters.make.toLowerCase() === brand.toLowerCase()
                      ? 'bg-primary/15 font-semibold text-primary border border-primary/30'
                      : 'text-muted-foreground hover:bg-muted border border-transparent'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="pt-3 space-y-2">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <span>Price (LKR)</span>
          <ChevronDown
            className={`size-3.5 transition-transform ${openSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.price && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-muted-foreground">Min (LKR)</span>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  onUpdateFilters({
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-8 text-xs rounded-lg mt-0.5"
              />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">Max (LKR)</span>
              <Input
                type="number"
                placeholder="50,000,000"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  onUpdateFilters({
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-8 text-xs rounded-lg mt-0.5"
              />
            </div>
          </div>
        )}
      </div>

      {/* Transmission */}
      <SidebarPillsSection
        title="Transmission"
        options={TRANSMISSIONS}
        value={filters.transmission}
        isOpen={openSections.transmission}
        onToggle={() => toggleSection('transmission')}
        onSelect={(transmission) => onUpdateFilters({ transmission })}
      />

      {/* Fuel Type */}
      <SidebarPillsSection
        title="Fuel Type"
        options={FUELS}
        value={filters.fuelType}
        isOpen={openSections.fuel}
        onToggle={() => toggleSection('fuel')}
        onSelect={(fuelType) => onUpdateFilters({ fuelType })}
      />

      {/* Condition */}
      <SidebarPillsSection
        title="Condition"
        options={CONDITIONS}
        value={filters.condition}
        isOpen={openSections.condition}
        onToggle={() => toggleSection('condition')}
        onSelect={(condition) => onUpdateFilters({ condition })}
      />
    </>
  )
}
