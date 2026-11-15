import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X, Image as ImageIcon, Sparkles, Check } from 'lucide-react'
import { type VehicleFormData, COMMON_FEATURES } from '../../types/adminForm.types'

const SAMPLE_IMAGE_SETS = [
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80',
]

interface StepProps {
  data: VehicleFormData
  onChange: (patch: Partial<VehicleFormData>) => void
}

export function VehicleFormStepMedia({ data, onChange }: StepProps) {
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newFeatureText, setNewFeatureText] = useState('')

  const handleAddImage = () => {
    const trimmed = newImageUrl.trim()
    if (!trimmed) return
    onChange({ images: [...data.images, trimmed] })
    setNewImageUrl('')
  }

  const handleAddFeature = (feat: string) => {
    const trimmed = feat.trim()
    if (!trimmed || data.features.includes(trimmed)) return
    onChange({ features: [...data.features, trimmed] })
    setNewFeatureText('')
  }

  const handleAutoDescription = () => {
    const desc = `Certified ${data.year || ''} ${data.make} ${data.model} in pristine showroom condition. Equipped with ${data.transmission} transmission, economical ${data.fuel_type} engine, and verified ${data.owners || 'single-owner'} documentation. Comprehensive 150-point diagnostic inspection completed.`
    onChange({ description: desc })
  }

  return (
    <div className="space-y-5">
      {/* Photos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold">
            Photographs ({data.images.length}) <span className="text-destructive">*</span>
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange({ images: Array.from(new Set([...data.images, ...SAMPLE_IMAGE_SETS])) })}
            className="h-6 text-[11px] gap-1 text-primary cursor-pointer"
          >
            <Sparkles className="size-3" />
            <span>Add sample photos</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
            placeholder="Paste high-res image URL (e.g. https://images.unsplash.com/...)"
            className="h-10 rounded-xl flex-1 text-xs"
          />
          <Button
            type="button"
            onClick={handleAddImage}
            disabled={!newImageUrl.trim()}
            className="rounded-xl h-10 px-4 text-xs font-semibold gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add</span>
          </Button>
        </div>

        {data.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {data.images.map((img, idx) => (
              <div key={idx} className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-border/70 bg-muted">
                <img src={img} alt={`Vehicle view ${idx + 1}`} className="size-full object-cover" />
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-primary text-primary-foreground shadow-xs">
                    Primary Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onChange({ images: data.images.filter((_, i) => i !== idx) })}
                  className="absolute top-1.5 right-1.5 size-6 rounded-md bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive transition-all cursor-pointer"
                  title="Remove"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-border text-center space-y-1 bg-muted/20">
            <ImageIcon className="size-5 text-muted-foreground mx-auto" />
            <p className="text-xs text-muted-foreground">No photos configured yet. Enter a URL above.</p>
          </div>
        )}
      </div>

      {/* Equipment Tags */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Key Highlights & Equipment</Label>
        <div className="flex gap-2">
          <Input
            value={newFeatureText}
            onChange={(e) => setNewFeatureText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature(newFeatureText))}
            placeholder="Type custom feature tag and press Enter"
            className="h-10 rounded-xl flex-1 text-xs"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => handleAddFeature(newFeatureText)}
            disabled={!newFeatureText.trim()}
            className="rounded-xl h-10 px-4 text-xs font-semibold shrink-0 cursor-pointer"
          >
            Add Tag
          </Button>
        </div>

        {data.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {data.features.map((feat) => (
              <span key={feat} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-medium">
                <span>{feat}</span>
                <button type="button" onClick={() => onChange({ features: data.features.filter((f) => f !== feat) })} className="hover:text-destructive cursor-pointer">
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground mr-1">Suggestions:</span>
          {COMMON_FEATURES.map((item) => {
            const isAdded = data.features.includes(item)
            return (
              <button
                key={item}
                type="button"
                onClick={() => (isAdded ? onChange({ features: data.features.filter((f) => f !== item) }) : handleAddFeature(item))}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                  isAdded ? 'bg-muted text-foreground border-border font-medium' : 'bg-card text-muted-foreground border-border/60 hover:bg-muted/50'
                }`}
              >
                {isAdded ? <Check className="size-3 text-emerald-500" /> : <Plus className="size-3" />}
                <span>{item}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="veh-desc" className="text-xs font-semibold">Editorial Overview / Description</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAutoDescription}
            className="h-6 text-[11px] gap-1 text-primary hover:text-primary cursor-pointer"
          >
            <Sparkles className="size-3" />
            <span>Auto-fill template</span>
          </Button>
        </div>
        <Textarea
          id="veh-desc"
          rows={3}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Provide an overview of vehicle condition, maintenance pedigree, factory packages..."
          className="rounded-xl text-xs sm:text-sm"
        />
      </div>
    </div>
  )
}
