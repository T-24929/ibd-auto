import { SlidersHorizontal, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterSheetHeaderProps {
  activeCount: number
  onReset: () => void
  onClose: () => void
}

export function FilterSheetHeader({
  activeCount,
  onReset,
  onClose,
}: FilterSheetHeaderProps) {
  return (
    <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between shrink-0 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <SlidersHorizontal className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground truncate">
              Cars for Sale in Sri Lanka
            </h3>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground shrink-0">
                {activeCount} active
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground truncate">
            Quickly filter verified pre-owned vehicles
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-2">
        {activeCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1 rounded-lg cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Close filter panel"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}
