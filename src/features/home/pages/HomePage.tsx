import { HeroSection } from '../components/HeroSection'
import { FeaturedVehicles } from '../components/FeaturedVehicles'
import { BuyingProcessSteps } from '../components/BuyingProcessSteps'
import { WhyChooseUs } from '../components/WhyChooseUs'

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 md:space-y-20">
      {/* 1. Hero Search & Animated Carousel */}
      <HeroSection />

      {/* 2. Latest Arrivals (6 Vehicles) + Browse All Inventory Banner */}
      <FeaturedVehicles />

      {/* 3. How Buying Works: 4-Step Visual Process with Images */}
      <BuyingProcessSteps />

      {/* 4. Mechanical Hoist Diagnosis & Title Assurances */}
      <WhyChooseUs />
    </div>
  )
}
