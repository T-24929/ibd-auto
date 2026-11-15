import { useState } from 'react'
import type { Vehicle } from '@/types/database.types'
import { VehicleCard } from '@/features/vehicles/components/VehicleCard'
import { Eye, Sparkles } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import type { VehicleFormData } from '../../types/adminForm.types'

interface LivePreviewProps {
  data: VehicleFormData
  currentStep: number
}

export function VehicleFormLivePreview({ data, currentStep }: LivePreviewProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  const primaryImage =
    data.images[0] ||
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'

  const liveVehicle: Vehicle = {
    id: 'live-preview-card',
    title: data.title || `${data.year || ''} ${data.make || 'Vehicle'} ${data.model || ''}`.trim() || 'New Vehicle Listing',
    make: data.make || 'Make',
    model: data.model || 'Model',
    year: Number(data.year) || new Date().getFullYear(),
    price: Number(data.price) || 0,
    mileage: Number(data.mileage) || 0,
    fuel_type: data.fuel_type || 'Petrol',
    transmission: data.transmission || 'Automatic',
    body_type: data.body_type || 'Sedan',
    color: data.color || 'White',
    condition: data.condition || 'Excellent',
    status: data.status,
    description: data.description || null,
    images: data.images.length > 0 ? data.images : [primaryImage],
    location: data.location || 'Colombo Main Showroom',
    doors: Number(data.doors) || 4,
    seats: Number(data.seats) || 5,
    engine_capacity: data.engine_capacity || null,
    reg_number: data.reg_number || null,
    grade: data.grade || null,
    owners: data.owners || null,
    features: data.features,
    service_history: data.service_history || null,
    featured: data.featured,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const renderCardContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Sparkles className="size-3.5 text-primary" />
          <span>Real-time Card Preview</span>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Live Sync
        </span>
      </div>

      <div className="pointer-events-none">
        <VehicleCard vehicle={liveVehicle} />
      </div>

      <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-2 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Configured Photos:</span>
          <span className="font-semibold text-foreground">{data.images.length} images</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Active Step:</span>
          <span className="font-semibold text-primary">Step {currentStep} of 4</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Card Badge:</span>
          <span className="font-semibold text-foreground">{data.condition} • {data.status}</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Floating Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button className="rounded-full shadow-xl gap-2 font-semibold h-11 px-4 cursor-pointer">
              <Eye className="size-4" />
              <span>Preview Card</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl p-6">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-base font-semibold">Live Vehicle Preview</SheetTitle>
            </SheetHeader>
            {renderCardContent()}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sticky Column */}
      <aside className="hidden lg:block sticky top-6 space-y-4">
        <div className="p-5 rounded-2xl border border-border/80 bg-card shadow-sm space-y-4">
          {renderCardContent()}
        </div>
      </aside>
    </>
  )
}
