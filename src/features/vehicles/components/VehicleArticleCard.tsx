import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatKM, formatLKRInLakhs } from '@/lib/formatters'
import type { Vehicle } from '@/types/database.types'
import {
  Calendar,
  Gauge,
  Fuel,
  Cog,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react'

interface VehicleArticleCardProps {
  vehicle: Vehicle
  matchReason?: string
}

export function VehicleArticleCard({
  vehicle,
  matchReason,
}: VehicleArticleCardProps) {
  const mainImage =
    vehicle.images?.[0] ||
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'

  return (
    <Card className="group overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-card/70 hover:bg-card/95 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-border flex flex-col justify-between">
      {/* Top Editorial Ribbon */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2 text-[11px] text-muted-foreground border-b border-border/30">
        <span className="font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="size-3 text-primary" />
          <span>{matchReason || `${vehicle.body_type} Alternative`}</span>
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="size-3" />
          <span>{vehicle.location || 'Colombo Showroom'}</span>
        </span>
      </div>

      {/* Article Featured Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={mainImage}
          alt={vehicle.title}
          loading="lazy"
          className="size-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-3 left-3 flex items-center text-white">
          <Badge className="bg-black/60 backdrop-blur-md text-white border-white/20 text-xs font-medium">
            {vehicle.year} • {vehicle.fuel_type}
          </Badge>
        </div>
      </div>

      {/* Editorial Content & Excerpt */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {vehicle.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {vehicle.description ||
              `Mechanically certified ${vehicle.year} ${vehicle.make} with verified odometer and DMT clear title inspection on file.`}
          </p>
        </div>

        {/* Quick Technical Micro-Specs Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate">
            <Gauge className="size-3.5 text-primary shrink-0" />
            <span>{formatKM(vehicle.mileage)}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Cog className="size-3.5 text-primary shrink-0" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Fuel className="size-3.5 text-primary shrink-0" />
            <span>{vehicle.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="size-3.5 text-primary shrink-0" />
            <span>{vehicle.condition || 'Pre-Owned'}</span>
          </div>
        </div>

        {/* Pricing & Read/Inspect Action */}
        <div className="pt-2 flex items-center justify-between border-t border-border/40">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
              Showroom Price
            </span>
            <span className="font-semibold text-base sm:text-lg text-foreground tracking-tight">
              Rs. {formatLKRInLakhs(vehicle.price)}
            </span>
          </div>

          <Link
            to="/vehicles/$id"
            params={{ id: vehicle.id }}
            viewTransition
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs group/btn active:scale-95"
          >
            <span>View Details</span>
            <ArrowRight className="size-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
