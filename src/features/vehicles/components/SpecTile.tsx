import type { ComponentType } from 'react'

export interface SpecItem {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
}

export function SpecTile({ label, value, icon: Icon }: SpecItem) {
  return (
    <div className="flex flex-col justify-between gap-2 p-3 sm:p-3.5 rounded-2xl border border-border/80 bg-muted/40 hover:bg-muted/70 hover:border-border hover:shadow-2xs transition-all duration-200">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <span className="size-6 rounded-md bg-card border border-border/70 flex items-center justify-center text-foreground shrink-0 shadow-2xs">
          <Icon className="size-3.5" />
        </span>
        <span className="text-muted-foreground text-[11px] sm:text-xs font-medium tracking-tight">
          {label}
        </span>
      </div>
      <span className="font-semibold text-sm sm:text-base text-foreground tracking-tight leading-snug">
        {value}
      </span>
    </div>
  )
}
