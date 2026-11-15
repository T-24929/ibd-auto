import { HeroVehicleFilterSheet } from './HeroVehicleFilterSheet'
import { FilterSheetHeader } from './filter-sheet/FilterSheetHeader'
import { FilterSheetBody } from './filter-sheet/FilterSheetBody'
import { FilterSheetFooter } from './filter-sheet/FilterSheetFooter'
import { useHeroSearchParams } from '../hooks/useHeroSearchParams'

interface HeroSearchCardProps {
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SriLankanHeroSearchCard({
  className = '',
  open,
  onOpenChange,
}: HeroSearchCardProps) {
  // If controlled via open / onOpenChange, delegate directly to the responsive sheet/drawer
  if (open !== undefined && onOpenChange !== undefined) {
    return <HeroVehicleFilterSheet open={open} onOpenChange={onOpenChange} />
  }

  // Standalone inline fallback
  return <InlineFilterCard className={className} />
}

function InlineFilterCard({ className = '' }: { className?: string }) {
  const params = useHeroSearchParams()

  const activeCount = [
    params.make !== 'Any Make',
    Boolean(params.model.trim()),
    params.bodyType !== 'all',
    params.condition !== 'Any Condition',
    params.city !== 'All Cities',
    params.fuel !== 'Any Fuel',
    params.gear !== 'Any Gear',
    Boolean(params.minPrice),
    Boolean(params.maxPrice),
    Boolean(params.minYear),
    Boolean(params.maxYear),
  ].filter(Boolean).length

  return (
    <div className={`rounded-2xl border border-border bg-card text-foreground flex flex-col overflow-hidden shadow-lg ${className}`}>
      <FilterSheetHeader
        activeCount={activeCount}
        onReset={params.handleReset}
        onClose={() => {}}
      />
      <FilterSheetBody
        make={params.make}
        setMake={params.setMake}
        model={params.model}
        setModel={params.setModel}
        bodyType={params.bodyType}
        setBodyType={params.setBodyType}
        minPrice={params.minPrice}
        setMinPrice={params.setMinPrice}
        maxPrice={params.maxPrice}
        setMaxPrice={params.setMaxPrice}
        minYear={params.minYear}
        setMinYear={params.setMinYear}
        fuel={params.fuel}
        setFuel={params.setFuel}
        gear={params.gear}
        setGear={params.setGear}
        condition={params.condition}
        setCondition={params.setCondition}
        city={params.city}
        setCity={params.setCity}
      />
      <FilterSheetFooter
        onSearch={params.handleSearch}
        onReset={params.handleReset}
        hasActiveFilters={params.hasActiveFilters}
      />
    </div>
  )
}

export { HeroVehicleFilterSheet }
