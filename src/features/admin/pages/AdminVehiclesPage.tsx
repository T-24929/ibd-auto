import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { VehicleTable } from '../components/VehicleTable'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'
import { Button } from '@/components/ui/button'
import { Plus, Car } from 'lucide-react'
import { ErrorState } from '@/components/feedback'

export function AdminVehiclesPage() {
  const { data: vehicles = [], isLoading, isError, error, refetch } = useQuery(vehicleQueries.list())

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <Car className="size-4" />
            <span>Showroom Inventory</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Vehicle Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add, update specifications, adjust selling prices, or change availability status.
          </p>
        </div>

        <Button asChild className="rounded-xl gap-2 font-semibold shadow-md shadow-primary/20">
          <Link to="/admin/vehicles/new">
            <Plus className="size-4" />
            <span>Add Vehicle</span>
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="h-64 rounded-2xl bg-muted/40 animate-pulse border border-border/40" />
      ) : isError ? (
        <ErrorState
          title="Failed to Load Inventory"
          description="Could not communicate with the inventory database. Please verify your connection or retry."
          error={error}
          onRetry={refetch}
          homeHref="/admin"
        />
      ) : (
        <VehicleTable vehicles={vehicles} onRefresh={refetch} />
      )}
    </div>
  )
}
