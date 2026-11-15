import { Car, Truck, Compass, Sparkles } from 'lucide-react'

interface QuickCategoryItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const CATEGORIES: QuickCategoryItem[] = [
  { id: 'all', label: 'All Vehicles', icon: Sparkles },
  { id: 'cars', label: 'Buy Cars', icon: Car },
  { id: 'suvs', label: 'Buy SUVs', icon: Compass },
  { id: 'vans', label: 'Buy Vans', icon: Truck },
  { id: 'pickups', label: 'Buy Pickups', icon: Truck },
]

interface SriLankanQuickCategoriesProps {
  selectedCategory?: string
  onSelectCategory: (categoryId: string) => void
  className?: string
}

export function SriLankanQuickCategories({
  selectedCategory = 'all',
  onSelectCategory,
  className = '',
}: SriLankanQuickCategoriesProps) {
  return (
    <div className={`w-full overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory touch-pan-x ${className}`}>
      <div className="flex items-center gap-2.5 min-w-max px-0.5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase()

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id === 'all' ? 'all' : cat.id)}
              className={`snap-start flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 min-w-[96px] sm:min-w-[108px] text-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-[1.02]'
                  : 'bg-card text-foreground border-border/80 hover:border-primary/50 hover:bg-muted/60'
              }`}
            >
              <div
                className={`size-10 sm:size-11 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary/10 text-primary group-hover:scale-105'
                }`}
              >
                <Icon className="size-5" />
              </div>
              <span className="text-xs font-semibold tracking-tight">
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
