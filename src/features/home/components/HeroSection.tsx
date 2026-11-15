import { useState } from 'react'
import { HeroBannerCarousel } from './HeroBannerCarousel'
import { HeroQuickSearchCard } from './HeroQuickSearchCard'
import { HeroVehicleFilterSheet } from '@/features/vehicles/components/HeroVehicleFilterSheet'

export function HeroSection() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <section className="space-y-4 sm:space-y-6 pt-1 sm:pt-2">
      {/* Two Hero Cards Grid: Carousel Banner (8 cols) + Quick Search (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 items-stretch">
        {/* Left Hero Card - Animated Banner Carousel */}
        <HeroBannerCarousel />

        {/* Right Hero Card - Compact on Mobile, Absolute Overlay on Search */}
        <HeroQuickSearchCard onOpenFilterModal={() => setSearchModalOpen(true)} />
      </div>

      {/* Responsive Filter Sheet: Slide-over on Desktop, Bottom Drawer on Mobile */}
      <HeroVehicleFilterSheet
        open={searchModalOpen}
        onOpenChange={setSearchModalOpen}
      />
    </section>
  )
}
