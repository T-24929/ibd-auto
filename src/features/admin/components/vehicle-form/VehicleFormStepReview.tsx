import { Label } from '@/components/ui/label'
import { formatLKR, formatKM } from '@/lib/formatters'
import { ShieldCheck, Star, Edit3 } from 'lucide-react'
import type { VehicleFormData } from '../../types/adminForm.types'

interface StepProps {
  data: VehicleFormData
  onChange: (patch: Partial<VehicleFormData>) => void
  onJumpToStep: (step: number) => void
}

export function VehicleFormStepReview({ data, onChange, onJumpToStep }: StepProps) {
  const lakhsValue = data.price ? (data.price / 100000).toFixed(1) : '0'

  const reviewRows = [
    { label: 'Vehicle Title', value: data.title || 'Untitled', step: 1 },
    { label: 'Make & Model', value: `${data.make} ${data.model} (${data.year})`, step: 1 },
    { label: 'Powertrain', value: `${data.fuel_type} • ${data.transmission} • ${data.engine_capacity || 'N/A'}`, step: 1 },
    { label: 'Mileage & Color', value: `${formatKM(data.mileage)} • ${data.color || 'Standard'}`, step: 1 },
    { label: 'Selling Price', value: `${formatLKR(data.price)} (${lakhsValue} Lakhs)`, step: 2 },
    { label: 'Inventory Status', value: data.status.toUpperCase(), step: 2 },
    { label: 'Location', value: data.location || 'Colombo Main Showroom', step: 2 },
    { label: 'Registration & Owners', value: `${data.reg_number || 'Unregistered'} • ${data.owners || '1st Owner'}`, step: 2 },
    { label: 'Photos Configured', value: `${data.images.length} high-res photographs`, step: 3 },
    { label: 'Equipment Tags', value: `${data.features.length} features listed`, step: 3 },
  ]

  return (
    <div className="space-y-6">
      {/* Featured Listing Toggle */}
      <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Star className="size-4 text-amber-500 fill-amber-500" />
            <Label htmlFor="veh-featured" className="font-semibold text-sm text-foreground cursor-pointer">
              Promote to Showroom Featured Fleet
            </Label>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pl-6">
            Featured vehicles appear with priority badges on the home page arrivals carousel and top inventory filters.
          </p>
        </div>

        <input
          id="veh-featured"
          type="checkbox"
          checked={data.featured}
          onChange={(e) => onChange({ featured: e.target.checked })}
          className="size-5 rounded border-border text-primary focus:ring-primary mt-1 cursor-pointer"
        />
      </div>

      {/* Specifications Breakdown Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Specification Summary
        </h4>

        <div className="rounded-2xl border border-border/70 overflow-hidden divide-y divide-border/60 bg-card">
          {reviewRows.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 sm:px-4 text-xs hover:bg-muted/30 transition-colors"
            >
              <span className="text-muted-foreground font-medium w-1/3 truncate">{row.label}</span>
              <span className="text-foreground font-semibold flex-1 px-2 truncate text-right sm:text-left">
                {row.value}
              </span>
              <button
                type="button"
                onClick={() => onJumpToStep(row.step)}
                className="text-[11px] text-primary hover:underline flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
              >
                <Edit3 className="size-3" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Assurances */}
      <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
        <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="text-xs">
          <span className="font-semibold text-foreground">150-Point Hoist Inspection: </span>
          <span className="text-muted-foreground">
            Upon publishing, this vehicle listing will automatically display verified inspection badges and DMT title clearance flags.
          </span>
        </div>
      </div>
    </div>
  )
}
