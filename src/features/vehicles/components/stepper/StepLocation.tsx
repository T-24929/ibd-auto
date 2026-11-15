interface StepLocationProps {
  city: string
  setCity: (v: string) => void
  fuel: string
  setFuel: (v: string) => void
  gear: string
  setGear: (v: string) => void
  condition: string
  setCondition: (v: string) => void
}

const SRI_LANKA_CITIES = [
  'All Cities',
  'Colombo',
  'Gampaha',
  'Kandy',
  'Negombo',
  'Kurunegala',
  'Galle',
  'Kalutara',
  'Matara',
]

const FUEL_TYPES = ['Any Fuel', 'Petrol', 'Hybrid', 'Diesel', 'Electric']
const TRANSMISSIONS = ['Any Gear', 'Automatic', 'Manual']
const CONDITIONS = [
  { label: 'Any Condition', value: 'Any Condition' },
  { label: 'Reconditioned', value: 'Reconditioned' },
  { label: 'Registered Used', value: 'Used' },
  { label: 'Brand New', value: 'Brand New' },
]

export function StepLocation({
  city,
  setCity,
  fuel,
  setFuel,
  gear,
  setGear,
  condition,
  setCondition,
}: StepLocationProps) {
  return (
    <div className="space-y-4">
      {/* Location / District */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-zinc-300">Location / District</label>
          <span className="text-[11px] text-emerald-400 font-medium">{city}</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {SRI_LANKA_CITIES.map((c) => {
            const active = city === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className={`h-9 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border truncate ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-muted/50 text-muted-foreground border-border hover:border-border/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      {/* Fuel Type & Transmission Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fuel */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Fuel Type</label>
          <div className="flex flex-wrap gap-1.5">
            {FUEL_TYPES.map((f) => {
              const active = fuel === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFuel(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                      : 'bg-muted/50 text-muted-foreground border-border hover:text-foreground hover:border-border/80 hover:bg-muted'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {/* Transmission */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Gear / Transmission</label>
          <div className="flex flex-wrap gap-1.5">
            {TRANSMISSIONS.map((g) => {
              const active = gear === g
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGear(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                      : 'bg-muted/50 text-muted-foreground border-border hover:text-foreground hover:border-border/80 hover:bg-muted'
                  }`}
                >
                  {g}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Condition</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {CONDITIONS.map((cond) => {
            const active = condition === cond.value
            return (
              <button
                key={cond.value}
                type="button"
                onClick={() => setCondition(cond.value)}
                className={`h-9 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border truncate ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-muted/50 text-muted-foreground border-border hover:border-border/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {cond.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
