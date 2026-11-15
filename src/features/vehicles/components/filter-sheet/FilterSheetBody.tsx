import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface FilterSheetBodyProps {
  make: string
  setMake: (v: string) => void
  model: string
  setModel: (v: string) => void
  bodyType: string
  setBodyType: (v: string) => void
  minPrice: string
  setMinPrice: (v: string) => void
  maxPrice: string
  setMaxPrice: (v: string) => void
  minYear: string
  setMinYear: (v: string) => void
  fuel: string
  setFuel: (v: string) => void
  gear: string
  setGear: (v: string) => void
  condition: string
  setCondition: (v: string) => void
  city: string
  setCity: (v: string) => void
}

const BODY_OPTIONS = [
  { label: 'All Types', value: 'all' },
  { label: 'Sedans', value: 'Sedan' },
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

const BUDGET_PRESETS = [
  { label: 'Any Budget', min: '', max: '' },
  { label: '< 15M', min: '', max: '15000000' },
  { label: '15M - 30M', min: '15000000', max: '30000000' },
  { label: '30M - 50M', min: '30000000', max: '50000000' },
  { label: '> 50M', min: '50000000', max: '' },
]

const YEAR_PRESETS = [
  { label: 'Any Year', val: '' },
  { label: '2023+', val: '2023' },
  { label: '2020+', val: '2020' },
  { label: '2018+', val: '2018' },
  { label: '2015+', val: '2015' },
]

const FUEL_TYPES = ['Any Fuel', 'Petrol', 'Hybrid', 'Diesel', 'Electric']
const TRANSMISSIONS = ['Any Gear', 'Automatic', 'Manual']
const CONDITIONS = [
  { label: 'Any Condition', value: 'Any Condition' },
  { label: 'Reconditioned', value: 'Reconditioned' },
  { label: 'Registered Used', value: 'Used' },
  { label: 'Brand New', value: 'Brand New' },
]

export function FilterSheetBody({
  make,
  setMake,
  model,
  setModel,
  bodyType,
  setBodyType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minYear,
  setMinYear,
  fuel,
  setFuel,
  gear,
  setGear,
  condition,
  setCondition,
}: FilterSheetBodyProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-foreground divide-y divide-border/40">
      {/* 1. Body Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
          Vehicle Type
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {BODY_OPTIONS.map((opt) => {
            const active = bodyType === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBodyType(opt.value)}
                className={`h-8 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Brand & Model */}
      <div className="space-y-3 pt-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
            Brand / Make
          </label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="text-xs bg-muted/50 border border-border/60 rounded-md px-2 py-1 text-foreground font-medium cursor-pointer focus:outline-none"
          >
            {ALL_MAKES.map((m) => (
              <option key={m} value={m} className="bg-popover text-foreground">
                {m === 'Any Make' ? 'All Makes' : m}
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
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                }`}
              >
                {brand}
              </button>
            )
          })}
        </div>

        <div className="relative pt-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model name (e.g. Prado, Vezel, Civic, Yaris...)"
            className="pl-8 h-9 text-xs rounded-lg bg-background border-border/60"
          />
        </div>
      </div>

      {/* 3. Budget Range (LKR) */}
      <div className="space-y-2 pt-4">
        <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
          Budget (LKR)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {BUDGET_PRESETS.map((b) => {
            const active = minPrice === b.min && maxPrice === b.max
            return (
              <button
                key={b.label}
                type="button"
                onClick={() => {
                  setMinPrice(b.min)
                  setMaxPrice(b.max)
                }}
                className={`h-8 px-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border truncate ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                }`}
              >
                {b.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price (Rs.)"
            className="h-9 text-xs rounded-lg bg-background border-border/60"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price (Rs.)"
            className="h-9 text-xs rounded-lg bg-background border-border/60"
          />
        </div>
      </div>

      {/* 4. Year & Powertrain */}
      <div className="space-y-4 pt-4">
        {/* Year */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
            Year of Manufacture
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {YEAR_PRESETS.map((y) => {
              const active = minYear === y.val
              return (
                <button
                  key={y.label}
                  type="button"
                  onClick={() => setMinYear(y.val)}
                  className={`h-8 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                  }`}
                >
                  {y.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
            Fuel Type
          </label>
          <div className="flex flex-wrap gap-1.5">
            {FUEL_TYPES.map((f) => {
              const active = fuel === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFuel(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {/* Gearbox & Condition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
              Transmission
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TRANSMISSIONS.map((g) => {
                const active = gear === g
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGear(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                    }`}
                  >
                    {g}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
              Condition
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CONDITIONS.map((c) => {
                const active = condition === c.value
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCondition(c.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'
                    }`}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
