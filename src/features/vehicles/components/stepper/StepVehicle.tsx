import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface StepVehicleProps {
  make: string
  setMake: (v: string) => void
  model: string
  setModel: (v: string) => void
  bodyType: string
  setBodyType: (v: string) => void
}

const BODY_OPTIONS = [
  { label: 'All Types', value: 'all' },
  { label: 'Cars', value: 'Sedan' },
  { label: 'SUVs', value: 'SUV' },
  { label: 'Vans', value: 'Van' },
  { label: 'Pickups', value: 'Truck' },
]

const POPULAR_MAKES = [
  'Toyota',
  'Honda',
  'Nissan',
  'Suzuki',
  'Mitsubishi',
  'Mercedes-Benz',
  'BMW',
]

const ALL_MAKES = [
  'Any Make',
  'Toyota',
  'Honda',
  'Nissan',
  'Suzuki',
  'Mitsubishi',
  'Mercedes-Benz',
  'BMW',
  'Hyundai',
  'Kia',
  'Land Rover',
  'Audi',
]

export function StepVehicle({
  make,
  setMake,
  model,
  setModel,
  bodyType,
  setBodyType,
}: StepVehicleProps) {
  return (
    <div className="space-y-4">
      {/* Body Type Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground">Vehicle Type</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {BODY_OPTIONS.map((opt) => {
            const active = bodyType === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBodyType(opt.value)}
                className={`h-9 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-muted/50 text-muted-foreground border-border hover:border-border/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Brand Selection */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-foreground">Brand / Make</label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="text-xs bg-transparent text-primary font-medium cursor-pointer focus:outline-none"
          >
            {ALL_MAKES.map((m) => (
              <option key={m} value={m} className="bg-card text-foreground">
                {m === 'Any Make' ? 'All Brands Dropdown' : m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {POPULAR_MAKES.map((brand) => {
            const active = make === brand
            return (
              <button
                key={brand}
                type="button"
                onClick={() => setMake(active ? 'Any Make' : brand)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                    : 'bg-muted/50 text-muted-foreground border-border hover:text-foreground hover:border-border/80 hover:bg-muted'
                }`}
              >
                {brand}
              </button>
            )
          })}
        </div>
      </div>

      {/* Specific Model Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Model Name (Optional)</label>
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g. Yaris, Corolla, Vezel, Prado, Civic"
            className="h-11 w-full pl-10 pr-3.5 rounded-xl bg-background border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
