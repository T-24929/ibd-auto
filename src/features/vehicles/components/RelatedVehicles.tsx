import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useSimilarVehicles } from '../hooks/useSimilarVehicles'
import { VehicleArticleCard } from './VehicleArticleCard'
import { Button } from '@/components/ui/button'
import type { Vehicle } from '@/types/database.types'

interface RelatedVehiclesProps {
  currentVehicle: Vehicle
}

export function RelatedVehicles({ currentVehicle }: RelatedVehiclesProps) {
  const { allSimilar, totalCount } = useSimilarVehicles(
    currentVehicle,
    'curated'
  )

  if (totalCount === 0) return null

  const displayList = allSimilar.slice(0, 3)

  return (
    <section className="space-y-5 pt-8 border-t border-border/40">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            Similar vehicles in our showroom
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            Comparable options matching {currentVehicle.title}&apos;s category, powertrain, and price.
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-xl h-9.5 px-3.5 text-xs font-semibold gap-1.5 self-start sm:self-auto hover:bg-card border-border/80"
        >
          <Link to="/vehicles">
            <span>View All Stock</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      {/* Responsive Vehicle Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayList.map((veh) => (
          <VehicleArticleCard key={veh.id} vehicle={veh} />
        ))}
      </div>
    </section>
  )
}
