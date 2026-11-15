import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useHeroSearchParams } from '../hooks/useHeroSearchParams'
import { FilterSheetHeader } from './filter-sheet/FilterSheetHeader'
import { FilterSheetBody } from './filter-sheet/FilterSheetBody'
import { FilterSheetFooter } from './filter-sheet/FilterSheetFooter'

interface HeroVehicleFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HeroVehicleFilterSheet({
  open,
  onOpenChange,
}: HeroVehicleFilterSheetProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
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

  const handleSearchAndClose = () => {
    params.handleSearch()
    onOpenChange(false)
  }

  const content = (
    <>
      <FilterSheetHeader
        activeCount={activeCount}
        onReset={params.handleReset}
        onClose={() => onOpenChange(false)}
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
        onSearch={handleSearchAndClose}
        onReset={params.handleReset}
        hasActiveFilters={params.hasActiveFilters}
      />
    </>
  )

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col gap-0 border-l border-border bg-background shadow-2xl focus:outline-none"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Cars for Sale in Sri Lanka Filter</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90dvh] flex flex-col p-0 border-t border-border bg-background rounded-t-3xl shadow-2xl focus:outline-none">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Cars for Sale in Sri Lanka Filter</DrawerTitle>
        </DrawerHeader>
        <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-1 shrink-0" />
        {content}
      </DrawerContent>
    </Drawer>
  )
}
