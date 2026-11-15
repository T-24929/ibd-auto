import { Input } from '@/components/ui/input'

interface StepBudgetProps {
  minPrice: string
  setMinPrice: (v: string) => void
  maxPrice: string
  setMaxPrice: (v: string) => void
  minYear: string
  setMinYear: (v: string) => void
  maxYear: string
  setMaxYear: (v: string) => void
}

const BUDGET_PRESETS = [
  { label: 'Any Budget', min: '', max: '' },
  { label: 'Under 10M', min: '', max: '10000000' },
  { label: '10M - 20M', min: '10000000', max: '20000000' },
  { label: '20M - 35M', min: '20000000', max: '35000000' },
  { label: 'Above 35M', min: '35000000', max: '' },
]

const YEAR_PRESETS = [
  { label: 'Any Year', min: '' },
  { label: '2023+', min: '2023' },
  { label: '2020+', min: '2020' },
  { label: '2018+', min: '2018' },
  { label: '2015+', min: '2015' },
]

export function StepBudget({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
}: StepBudgetProps) {
  return (
    <div className="space-y-4">
      {/* Price Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300">Price Range</label>
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
                className={`h-9 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border truncate ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-muted/50 text-muted-foreground border-border hover:border-border/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {b.label}
              </button>
            )
          })}
        </div>

        {/* Custom Min / Max Price Inputs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price (Rs.)"
            className="h-10 rounded-xl bg-background border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price (Rs.)"
            className="h-10 rounded-xl bg-background border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Year Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground">Year of Manufacture</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {YEAR_PRESETS.map((y) => {
            const active = minYear === y.min
            return (
              <button
                key={y.label}
                type="button"
                onClick={() => setMinYear(y.min)}
                className={`h-9 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                    : 'bg-muted/50 text-muted-foreground border-border hover:border-border/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {y.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <select
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="h-10 px-3 rounded-xl bg-background border border-border text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Year Min (Any)</option>
            {[2024, 2023, 2022, 2021, 2020, 2018, 2015, 2010].map((yr) => (
              <option key={yr} value={yr} className="bg-card text-foreground">{yr}</option>
            ))}
          </select>

          <select
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            className="h-10 px-3 rounded-xl bg-background border border-border text-xs font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Year Max (Any)</option>
            {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
              <option key={yr} value={yr} className="bg-card text-foreground">{yr}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
