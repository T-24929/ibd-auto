import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { Vehicle } from '@/types/database.types'
import { formatLKR, formatKM } from '@/lib/formatters'
import { Heart, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { getFuelShade } from '../utils/vehicleSpecs.utils'

interface VehicleCardProps {
  vehicle: Vehicle
  variant?: 'grid' | 'horizontal'
  transitionPrefix?: string
  badgeLabel?: string
}

export function VehicleCard({
  vehicle,
  variant = 'grid',
  transitionPrefix,
  badgeLabel,
}: VehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const isHorizontal = variant === 'horizontal'
  const primaryImage = vehicle.images?.[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nextState = !isFavorite
    setIsFavorite(nextState)
    toast.success(nextState ? `Saved ${vehicle.title} to favorites` : 'Removed from favorites')
  }

  const brand = vehicle.make?.toUpperCase() || ''
  const model = vehicle.model?.toUpperCase() || ''
  const displayTitle = brand && model ? `${brand} ${model}` : vehicle.title.toUpperCase()

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        to="/vehicles/$id"
        params={{ id: vehicle.id }}
        viewTransition
        className={cn(
          'group flex h-full overflow-hidden rounded-2xl sm:rounded-[22px] border border-border/70 bg-card hover:bg-card/90 shadow-xs hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation',
          isHorizontal ? 'flex-col md:flex-row md:items-stretch' : 'flex-col',
        )}
        style={{ viewTransitionName: `${transitionPrefix || 'vehicle-card'}-${vehicle.id}` }}
      >
        {/* Photo Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-neutral-100 dark:bg-zinc-800',
            isHorizontal ? 'aspect-[16/10] md:aspect-auto md:w-1/2 md:min-h-[260px]' : 'aspect-[16/10]',
          )}
          style={{
            viewTransitionName: `${transitionPrefix ? `${transitionPrefix}-image` : 'vehicle-image'}-${vehicle.id}`,
          }}
        >
          <img
            src={primaryImage}
            alt={vehicle.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          {/* Top-Right Status Badge - Only shown when needed (reserved, sold, or custom badgeLabel) */}
          {(badgeLabel || vehicle.status === 'reserved' || vehicle.status === 'sold') && (
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-white font-semibold text-[10px] tracking-wide shadow-xs backdrop-blur-xs',
                  vehicle.status === 'sold'
                    ? 'bg-zinc-900/90 border border-white/10'
                    : vehicle.status === 'reserved'
                    ? 'bg-amber-600/90 border border-amber-400/30'
                    : 'bg-primary/90 text-primary-foreground'
                )}
              >
                {badgeLabel || (vehicle.status === 'reserved' ? 'Reserved' : 'Sold')}
              </span>
            </div>
          )}

          {/* Location Tag */}
          {vehicle.location && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] font-medium text-white/95 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate max-w-[170px]">{vehicle.location.split(',')[0]}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div
          className={cn(
            'p-4 sm:p-4.5 flex flex-col justify-between flex-1 gap-3.5',
            isHorizontal ? 'md:w-1/2 md:p-6 md:gap-5' : '',
          )}
        >
          {/* 1st: Vehicle Title Header & Subtitle */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={cn(
                  'font-bold tracking-wider uppercase text-foreground truncate group-hover:text-primary transition-colors',
                  isHorizontal ? 'text-xs sm:text-[13px] md:text-base' : 'text-xs sm:text-[13px]',
                )}
                style={{
                  viewTransitionName: `${transitionPrefix ? `${transitionPrefix}-title` : 'vehicle-title'}-${vehicle.id}`,
                }}
              >
                {displayTitle}
              </h3>
              <span className="text-xs font-semibold text-muted-foreground shrink-0">
                {vehicle.year}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground truncate font-normal">
              {vehicle.grade || vehicle.title}
            </p>
          </div>

          {/* Shaded Attribute Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={cn('px-2.5 py-0.5 rounded-md text-[11px] font-medium border', getFuelShade(vehicle.fuel_type))}>
              {vehicle.fuel_type}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted/80 text-foreground/80 border border-border/50">
              {vehicle.transmission}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted/80 text-foreground/80 border border-border/50">
              {formatKM(vehicle.mileage)}
            </span>
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-3">
            <div>
              <div className={cn('font-bold tracking-tight text-foreground leading-none', isHorizontal ? 'text-lg sm:text-xl md:text-2xl' : 'text-lg sm:text-xl')}>
                {formatLKR(vehicle.price)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isHorizontal && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-xs">
                  <span>View Details</span>
                  <ArrowRight className="size-3.5" />
                </span>
              )}

              <button
                type="button"
                onClick={handleFavoriteToggle}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className={cn(
                  'size-8 rounded-full border flex items-center justify-center transition-all cursor-pointer active:scale-90',
                  isFavorite
                    ? 'border-red-500/40 bg-red-500/10 text-red-500'
                    : 'border-border/60 hover:border-border text-muted-foreground hover:text-red-500 hover:bg-muted/40',
                )}
              >
                <Heart className={cn('size-4 transition-transform', isFavorite && 'fill-current scale-110')} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
