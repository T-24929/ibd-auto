import { Search, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterSheetFooterProps {
  onSearch: () => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function FilterSheetFooter({
  onSearch,
  onReset,
  hasActiveFilters,
}: FilterSheetFooterProps) {
  return (
    <div className="p-4 border-t border-border/60 bg-background/90 backdrop-blur-md flex items-center gap-2.5 shrink-0">
      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-10 px-3 rounded-xl border-border text-xs font-semibold text-muted-foreground hover:text-foreground gap-1.5 cursor-pointer shrink-0"
        >
          <RotateCcw className="size-3.5" />
          <span>Reset</span>
        </Button>
      )}

      <Button
        type="button"
        onClick={onSearch}
        className="flex-1 h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm transition-all gap-2 cursor-pointer active:scale-[0.99]"
      >
        <Search className="size-4" />
        <span>Search Classified Vehicles</span>
      </Button>
    </div>
  )
}
