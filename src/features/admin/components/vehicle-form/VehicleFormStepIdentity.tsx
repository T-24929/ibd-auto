import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import {
  type VehicleFormData,
  POPULAR_MAKES,
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
} from '../../types/adminForm.types'

interface StepProps {
  data: VehicleFormData
  onChange: (patch: Partial<VehicleFormData>) => void
}

export function VehicleFormStepIdentity({ data, onChange }: StepProps) {
  const handleAutoTitle = () => {
    if (!data.make && !data.model) return
    const auto = `${data.year || ''} ${data.make} ${data.model} ${data.grade || ''}`.trim()
    onChange({ title: auto })
  }

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="veh-title" className="text-xs font-semibold">
            Listing Headline / Public Title <span className="text-destructive">*</span>
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAutoTitle}
            disabled={!data.make || !data.model}
            className="h-6 text-[11px] gap-1 text-primary hover:text-primary cursor-pointer"
          >
            <Sparkles className="size-3" />
            <span>Generate title</span>
          </Button>
        </div>
        <Input
          id="veh-title"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. 2021 Toyota RAV4 Hybrid XSE AWD"
          className="h-10 rounded-xl"
          required
        />
      </div>

      {/* Make, Model, Year */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label htmlFor="veh-make" className="text-xs font-semibold">Make <span className="text-destructive">*</span></Label>
            <Input
              id="veh-make"
              value={data.make}
              onChange={(e) => onChange({ make: e.target.value })}
              placeholder="e.g. Toyota"
              className="h-10 rounded-xl"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="veh-model" className="text-xs font-semibold">Model <span className="text-destructive">*</span></Label>
            <Input
              id="veh-model"
              value={data.model}
              onChange={(e) => onChange({ model: e.target.value })}
              placeholder="e.g. RAV4"
              className="h-10 rounded-xl"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="veh-year" className="text-xs font-semibold">Year <span className="text-destructive">*</span></Label>
            <Input
              id="veh-year"
              type="number"
              min={1990}
              max={2030}
              value={data.year}
              onChange={(e) => onChange({ year: Number(e.target.value) })}
              className="h-10 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Quick Brands */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground mr-1">Quick Select:</span>
          {POPULAR_MAKES.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => onChange({ make: brand })}
              className={`px-2 py-0.5 text-[11px] rounded-lg border transition-all cursor-pointer ${
                data.make.toLowerCase() === brand.toLowerCase()
                  ? 'bg-primary text-primary-foreground border-primary font-medium'
                  : 'bg-muted/40 hover:bg-muted text-muted-foreground border-border/60'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Body Type & Powertrain */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label htmlFor="veh-body" className="text-xs font-semibold">Body Type</Label>
          <select
            id="veh-body"
            value={data.body_type}
            onChange={(e) => onChange({ body_type: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {BODY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="veh-fuel" className="text-xs font-semibold">Fuel / Powertrain</Label>
          <select
            id="veh-fuel"
            value={data.fuel_type}
            onChange={(e) => onChange({ fuel_type: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="veh-trans" className="text-xs font-semibold">Transmission</Label>
          <select
            id="veh-trans"
            value={data.transmission}
            onChange={(e) => onChange({ transmission: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Mileage, Engine Capacity & Color */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label htmlFor="veh-mileage" className="text-xs font-semibold">Mileage (km) <span className="text-destructive">*</span></Label>
          <Input
            id="veh-mileage"
            type="number"
            min={0}
            value={data.mileage}
            onChange={(e) => onChange({ mileage: Number(e.target.value) })}
            placeholder="e.g. 32000"
            className="h-10 rounded-xl"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="veh-engine" className="text-xs font-semibold">Engine Spec / Capacity</Label>
          <Input
            id="veh-engine"
            value={data.engine_capacity}
            onChange={(e) => onChange({ engine_capacity: e.target.value })}
            placeholder="e.g. 2,500 cc Hybrid"
            className="h-10 rounded-xl"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="veh-color" className="text-xs font-semibold">Exterior Color</Label>
          <Input
            id="veh-color"
            value={data.color}
            onChange={(e) => onChange({ color: e.target.value })}
            placeholder="e.g. Blizzard Pearl"
            className="h-10 rounded-xl"
          />
        </div>
      </div>

      {/* Doors & Seats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="veh-doors" className="text-xs font-semibold">Doors</Label>
          <Input
            id="veh-doors"
            type="number"
            min={2}
            max={6}
            value={data.doors}
            onChange={(e) => onChange({ doors: Number(e.target.value) })}
            className="h-10 rounded-xl"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="veh-seats" className="text-xs font-semibold">Seating Capacity</Label>
          <Input
            id="veh-seats"
            type="number"
            min={1}
            max={12}
            value={data.seats}
            onChange={(e) => onChange({ seats: Number(e.target.value) })}
            className="h-10 rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
