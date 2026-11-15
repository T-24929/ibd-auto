import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatLKR } from '@/lib/formatters'
import type { VehicleStatus } from '@/types/database.types'
import type { VehicleFormData } from '../../types/adminForm.types'

const STATUS_OPTIONS: { value: VehicleStatus; label: string; desc: string }[] = [
  { value: 'available', label: 'Available', desc: 'Active in showroom catalog' },
  { value: 'reserved', label: 'Reserved', desc: 'Customer deposit held' },
  { value: 'sold', label: 'Sold', desc: 'Completed DMT ownership transfer' },
]

const CONDITIONS = ['Excellent', 'Good', 'Fair']
const OWNERS_OPTIONS = ['1st Owner', '2nd Owner', '3rd Owner', 'Direct Import (Unregistered)']
const SHOWROOM_LOCATIONS = [
  'Colombo Main Showroom',
  'Colombo City Branch',
  'Kandy Branch Showroom',
  'Kohuwala Showroom',
]

interface StepProps {
  data: VehicleFormData
  onChange: (patch: Partial<VehicleFormData>) => void
}

export function VehicleFormStepValuation({ data, onChange }: StepProps) {
  const lakhsValue = data.price ? (data.price / 100000).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      {/* Price with Live Lakhs Preview */}
      <div className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <Label htmlFor="veh-price" className="text-xs font-semibold text-foreground">
              Selling Price (LKR Rs.) <span className="text-destructive">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Exact drive-away amount displayed to customers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Preview:</span>
            <span className="px-2.5 py-1 rounded-lg bg-background border border-border text-foreground font-mono font-bold text-xs sm:text-sm shadow-2xs">
              {formatLKR(data.price || 0)}
            </span>
            <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary font-semibold text-xs">
              {lakhsValue} Lakhs
            </span>
          </div>
        </div>

        <Input
          id="veh-price"
          type="number"
          min={500000}
          step={50000}
          value={data.price}
          onChange={(e) => onChange({ price: Number(e.target.value) })}
          className="h-11 rounded-xl text-base font-semibold bg-background"
          required
        />
      </div>

      {/* Availability Status */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Inventory Status</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = data.status === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ status: opt.value })}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary/30 shadow-xs'
                    : 'border-border/60 bg-card hover:bg-muted/40 text-muted-foreground'
                }`}
              >
                <div className="font-semibold text-xs sm:text-sm text-foreground flex items-center justify-between">
                  <span>{opt.label}</span>
                  {isSelected && <span className="size-2 rounded-full bg-primary" />}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{opt.desc}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Showroom Location & Condition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="veh-loc" className="text-xs font-semibold">Showroom Location</Label>
          <select
            id="veh-loc"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {SHOWROOM_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="veh-cond" className="text-xs font-semibold">Condition Rating</Label>
          <select
            id="veh-cond"
            value={data.condition}
            onChange={(e) => onChange({ condition: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Registration Number, Grade & Ownership */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="veh-reg" className="text-xs font-semibold">Registration / CR Number</Label>
          <Input
            id="veh-reg"
            value={data.reg_number}
            onChange={(e) => onChange({ reg_number: e.target.value })}
            placeholder="e.g. WP CAB-xxxx or Unregistered"
            className="h-10 rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="veh-grade" className="text-xs font-semibold">Package / Grade</Label>
          <Input
            id="veh-grade"
            value={data.grade}
            onChange={(e) => onChange({ grade: e.target.value })}
            placeholder="e.g. XSE Package / Modellista"
            className="h-10 rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="veh-owners" className="text-xs font-semibold">Previous Ownership</Label>
          <select
            id="veh-owners"
            value={data.owners}
            onChange={(e) => onChange({ owners: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {OWNERS_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Service & Maintenance History */}
      <div className="space-y-1.5">
        <Label htmlFor="veh-service" className="text-xs font-semibold">Service & Agent History</Label>
        <Input
          id="veh-service"
          value={data.service_history}
          onChange={(e) => onChange({ service_history: e.target.value })}
          placeholder="e.g. Toyota Lanka Authorized Agent Maintained / Full Service Records"
          className="h-10 rounded-xl"
        />
        <p className="text-[11px] text-muted-foreground">
          Displayed on customer hoist inspection credentials and vehicle certificates.
        </p>
      </div>
    </div>
  )
}
