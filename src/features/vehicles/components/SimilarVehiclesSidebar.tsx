import { Link } from '@tanstack/react-router'
import { Sparkles, ArrowRight, Gauge, Fuel } from 'lucide-react'
import { useSimilarVehicles } from '../hooks/useSimilarVehicles'
import { formatLKRInLakhs, formatKM } from '@/lib/formatters'
import type { Vehicle } from '@/types/database.types'

interface SimilarVehiclesSidebarProps {
  currentVehicle: Vehicle
  limit?: number
}

export function SimilarVehiclesSidebar({
  currentVehicle,
  limit = 3,
}: SimilarVehiclesSidebarProps) {
  const { topScored, isLoading } = useSimilarVehicles(currentVehicle)
  const items = topScored.slice(0, limit)

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3.5 shadow-sm">
        <div className="h-5 w-40 bg-muted/60 rounded-md animate-pulse" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="size-16 rounded-xl bg-muted/60 animate-pulse shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 w-3/4 bg-muted/60 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-muted/40 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3.5 shadow-sm">
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-1 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h4 className="font-semibold text-sm text-foreground">
            Similar in Our Showroom
          </h4>
        </div>

        <Link
          to="/vehicles"
          search={{ bodyType: currentVehicle.body_type }}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Clean Editorial List (No nested card/bubble slop) */}
      <div className="divide-y divide-border/30">
        {items.map(({ vehicle, matchReason }) => {
          const mainImage =
            vehicle.images?.[0] ||
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'

          return (
            <Link
              key={vehicle.id}
              to="/vehicles/$id"
              params={{ id: vehicle.id }}
              viewTransition
              className="group flex gap-3.5 py-3 first:pt-1 last:pb-1 hover:bg-muted/30 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
            >
              {/* Image Thumbnail */}
              <div className="relative size-20 rounded-lg overflow-hidden shrink-0 bg-muted/50">
                <img
                  src={mainImage}
                  alt={vehicle.title}
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 left-1 text-[9px] font-semibold px-1 py-0.5 rounded bg-black/75 text-white">
                  {vehicle.year}
                </span>
              </div>

              {/* Editorial Info */}
              <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                <div>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
                    {matchReason}
                  </span>
                  <h5 className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                    {vehicle.title}
                  </h5>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Gauge className="size-3 text-muted-foreground/70" />
                    <span>{formatKM(vehicle.mileage)}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Fuel className="size-3 text-muted-foreground/70" />
                    <span>{vehicle.fuel_type}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <span className="font-semibold text-xs text-foreground">
                    Rs. {formatLKRInLakhs(vehicle.price)}
                  </span>
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground font-medium flex items-center gap-0.5">
                    View
                    <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
