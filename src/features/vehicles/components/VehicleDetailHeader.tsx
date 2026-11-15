import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { formatLKR, formatLKRInLakhs, formatKM } from '@/lib/formatters'
import type { Vehicle } from '@/types/database.types'
import { ArrowLeft, MapPin, Share2, Gauge, Fuel, Cog } from 'lucide-react'
import { toast } from 'sonner'

interface VehicleDetailHeaderProps {
  vehicle: Vehicle
}

export function VehicleDetailHeader({ vehicle }: VehicleDetailHeaderProps) {
  const router = useRouter()
  const formattedPrice = formatLKR(vehicle.price)
  const priceInLakhs = formatLKRInLakhs(vehicle.price)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      router.navigate({ to: '/' })
    }
  }

  // Shaded powertrain color
  const isHybridOrEV =
    vehicle.fuel_type.toLowerCase().includes('hybrid') ||
    vehicle.fuel_type.toLowerCase().includes('electric')

  return (
    <div className="space-y-3.5">
      {/* Navigation & Action Bar */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="rounded-xl gap-2 text-muted-foreground hover:text-foreground -ml-2 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="rounded-xl gap-2 text-xs"
        >
          <Share2 className="size-3.5" />
          <span>Share</span>
        </Button>
      </div>

      {/* Main Vehicle Header: Title, Price & 2x2 Grid */}
      <div className="space-y-3.5 border-b border-border/40">
        {/* Status & Model Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {vehicle.status === 'available' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Available
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 capitalize">
              {vehicle.status}
            </span>
          )}

          {vehicle.grade && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/60 text-foreground border border-border/40">
              {vehicle.grade}
            </span>
          )}

          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/40 text-muted-foreground border border-border/40">
            {vehicle.year} Model
          </span>
        </div>

        {/* Title & Price Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
          <div className="space-y-1 min-w-0">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold tracking-tight text-foreground leading-tight"
              style={{
                viewTransitionName: `vehicle-title-${vehicle.id}`,
              }}
            >
              {vehicle.title}
            </h1>
          </div>

          {/* Authoritative Price */}
          <div className="text-left md:text-right shrink-0">
            <div className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-foreground tracking-tight leading-none">
              {formattedPrice}
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-muted-foreground mt-1">
              Showroom Price • {priceInLakhs}
            </div>
          </div>
        </div>

        {/* 2x2 Grid on Mobile, 4-Col Grid on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          {/* Tile 1: Mileage */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-200">
            <div className="size-8.5 rounded-xl bg-muted flex items-center justify-center text-foreground shrink-0">
              <Gauge className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide block">
                Mileage
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {formatKM(vehicle.mileage)}
              </span>
            </div>
          </div>

          {/* Tile 2: Transmission */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-200">
            <div className="size-8.5 rounded-xl bg-muted flex items-center justify-center text-foreground shrink-0">
              <Cog className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide block">
                Gearbox
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {vehicle.transmission}
              </span>
            </div>
          </div>

          {/* Tile 3: Fuel / Powertrain */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-200">
            <div
              className={`size-8.5 rounded-xl flex items-center justify-center shrink-0 ${
                isHybridOrEV
                  ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300'
                  : 'bg-muted text-foreground'
              }`}
            >
              <Fuel className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide block">
                Powertrain
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {vehicle.fuel_type}
              </span>
            </div>
          </div>

          {/* Tile 4: Location */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-200">
            <div className="size-8.5 rounded-xl bg-muted flex items-center justify-center text-foreground shrink-0">
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide block">
                Location
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {vehicle.location?.split(',')[0] || 'Colombo'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
