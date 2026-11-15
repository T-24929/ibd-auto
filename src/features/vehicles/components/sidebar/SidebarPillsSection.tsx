import { ChevronDown } from 'lucide-react'

interface SidebarPillsSectionProps {
  title: string
  options: string[]
  value: string
  isOpen: boolean
  onToggle: () => void
  onSelect: (val: string) => void
}

export function SidebarPillsSection({
  title,
  options,
  value,
  isOpen,
  onToggle,
  onSelect,
}: SidebarPillsSectionProps) {
  return (
    <div className="pt-3 space-y-2">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <span>{title}</span>
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => onSelect('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              value === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/80 text-muted-foreground hover:bg-muted'
            }`}
          >
            Any
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                value.toLowerCase() === opt.toLowerCase()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/80 text-muted-foreground hover:bg-muted'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
