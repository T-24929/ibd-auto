import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useVehicles } from '../hooks/useVehicles'
import { VehicleGrid } from '../components/VehicleGrid'
import { SriLankanQuickCategories } from '../components/SriLankanQuickCategories'
import { ActiveFilterPills } from '../components/ActiveFilterPills'
import { MarketplaceSidebarFilters } from '../components/MarketplaceSidebarFilters'
import { VehicleFilterDrawer } from '../components/VehicleFilterDrawer'
import { MobileQuickFilters } from '../components/MobileQuickFilters'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal, ChevronRight, Home } from 'lucide-react'

export function VehicleListingsPage() {
  const {
    vehicles,
    allVehicles,
    isLoading,
    filters,
    updateFilters,
    resetFilters,
  } = useVehicles()

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const activeCount = [
    filters.make !== 'all',
    filters.model !== 'all',
    filters.category !== 'all',
    filters.condition !== 'all',
    filters.location !== 'all',
    filters.fuelType !== 'all',
    filters.transmission !== 'all',
    filters.minPrice > 0,
    filters.maxPrice < 100000000,
    Boolean(filters.search),
  ].filter(Boolean).length

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Breadcrumb Hierarchy */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary flex items-center gap-1">
          <Home className="size-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="size-3" />
        <Link to="/vehicles" className="hover:text-primary">
          All Ads
        </Link>
        <ChevronRight className="size-3" />
        <span className="font-semibold text-foreground">
          {filters.location !== 'all' ? `Vehicles in ${filters.location}` : 'Vehicles in Sri Lanka'}
        </span>
      </nav>

      {/* Quick Category Icons Bar */}
      <SriLankanQuickCategories
        selectedCategory={filters.category}
        onSelectCategory={(cat) => updateFilters({ category: cat })}
      />

      {/* Main 2-Column Marketplace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-20">
          <MarketplaceSidebarFilters
            filters={filters}
            onUpdateFilters={updateFilters}
            onReset={resetFilters}
            allVehicles={allVehicles}
          />
        </aside>

        {/* Right Column: Search Controls & Inventory Grid */}
        <div className="lg:col-span-3 space-y-3.5">
          {/* Top Search & Sorting Header */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between bg-card p-3 rounded-2xl border border-border/60 shadow-xs">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search make, model, trim, grade..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="pl-9 h-10 rounded-xl bg-background border-none shadow-none text-base sm:text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden rounded-xl h-10 px-3 text-xs gap-1.5 touch-manipulation active:scale-[0.97]"
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Filters</span>
                {activeCount > 0 && (
                  <span className="size-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </Button>

              {/* Sort Selector */}
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="h-10 rounded-xl px-3 bg-background border border-input text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shrink-0 cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest Model</option>
                <option value="mileage-asc">Lowest Mileage</option>
              </select>
            </div>
          </div>

          {/* Mobile Quick Horizontal Filters */}
          <MobileQuickFilters
            filters={filters}
            onUpdateFilters={updateFilters}
            onOpenDrawer={() => setMobileFilterOpen(true)}
            activeCount={activeCount}
          />

          {/* Active Filter Pills */}
          <ActiveFilterPills
            filters={filters}
            onUpdateFilters={updateFilters}
            onReset={resetFilters}
          />

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>
              Showing <strong className="text-foreground">{vehicles.length}</strong> verified vehicle{vehicles.length === 1 ? '' : 's'}
              {filters.location !== 'all' ? ` in ${filters.location}` : ' across Sri Lanka'}
            </span>
          </div>

          {/* Vehicle Grid */}
          <VehicleGrid
            vehicles={vehicles}
            isLoading={isLoading}
            onResetFilters={resetFilters}
          />
        </div>
      </div>

      {/* Native Mobile Bottom Sheet / Drawer */}
      <VehicleFilterDrawer
        open={mobileFilterOpen}
        onOpenChange={setMobileFilterOpen}
        filters={filters}
        onUpdateFilters={updateFilters}
        onReset={resetFilters}
        allVehicles={allVehicles}
        matchingCount={vehicles.length}
      />
    </div>
  )
}
