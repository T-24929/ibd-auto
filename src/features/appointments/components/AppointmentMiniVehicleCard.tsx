import type { Vehicle } from '@/types/database.types'
import { formatLKR } from '@/lib/formatters'

interface AppointmentMiniVehicleCardProps {
  vehicle: Vehicle
}

export function AppointmentMiniVehicleCard({ vehicle }: AppointmentMiniVehicleCardProps) {
  const thumbUrl =
    vehicle.images?.[0] ||
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'

  return (
    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-muted/40 border border-border/60">
      <img
        src={thumbUrl}
        alt={vehicle.title}
        className="size-14 sm:size-16 rounded-xl object-cover border border-border/40 shrink-0"
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
          {vehicle.year} {vehicle.title}
        </h4>
        <p className="text-xs text-muted-foreground font-medium truncate">
          {vehicle.fuel_type} • {vehicle.transmission} • {vehicle.mileage?.toLocaleString()} km
        </p>
        <p className="text-xs sm:text-sm font-bold text-foreground font-mono">
          {formatLKR(vehicle.price)}
        </p>
      </div>
    </div>
  )
}
