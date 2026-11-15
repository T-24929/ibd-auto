import { useParams, Link } from '@tanstack/react-router'
import { VehicleFormStepper } from '../components/vehicle-form/VehicleFormStepper'
import { useVehicleDetail } from '@/features/vehicles/hooks/useVehicleDetail'
import { EmptyState } from '@/components/feedback'
import { Car, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminVehicleFormPage() {
  const params = useParams({ strict: false }) as { id?: string }
  const id = params.id
  const isEditing = Boolean(id)
  const { vehicle, isLoading } = useVehicleDetail(id)

  if (isEditing && isLoading) {
    return (
      <div className="w-full py-12 space-y-4">
        <div className="h-8 w-48 bg-muted rounded-xl animate-pulse" />
        <div className="h-96 rounded-3xl bg-muted/60 animate-pulse border border-border/40" />
      </div>
    )
  }

  if (isEditing && !vehicle) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <EmptyState
          icon={Car}
          title="Vehicle Record Not Found"
          description="The vehicle you are trying to edit does not exist in our database or has already been deleted."
          action={{
            label: 'Back to Vehicle Inventory',
            href: '/admin/vehicles',
            icon: ArrowLeft,
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <Car className="size-4" />
            <span>Showroom Fleet Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? `Edit Vehicle: ${vehicle?.make} ${vehicle?.model}` : 'Add New Vehicle'}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure technical specifications, pricing, documents, and preview the live card in real time.
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="rounded-xl gap-2 text-xs self-start sm:self-auto">
          <Link to="/admin/vehicles">
            <ArrowLeft className="size-3.5" />
            <span>Back to Inventory</span>
          </Link>
        </Button>
      </div>

      {/* Stepper Form with Live Preview in Outlet */}
      <VehicleFormStepper initialVehicle={vehicle || undefined} isEditing={isEditing} />
    </div>
  )
}
