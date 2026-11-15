import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { type LucideIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  icon?: LucideIcon
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

export interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  children?: ReactNode
  compact?: boolean
  className?: string
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
  secondaryAction,
  children,
  compact = false,
  className,
}: EmptyStateProps) {
  const renderAction = (act: EmptyStateAction, isPrimary = true) => {
    const ActIcon = act.icon
    const variant = act.variant || (isPrimary ? 'default' : 'outline')
    const buttonContent = (
      <>
        {ActIcon && <ActIcon className="size-3.5" />}
        <span>{act.label}</span>
      </>
    )

    if (act.href) {
      return (
        <Button
          asChild
          size={compact ? 'sm' : 'default'}
          variant={variant}
          className="rounded-xl font-medium text-xs gap-1.5"
        >
          <Link to={act.href as any} viewTransition>
            {buttonContent}
          </Link>
        </Button>
      )
    }

    return (
      <Button
        type="button"
        size={compact ? 'sm' : 'default'}
        variant={variant}
        onClick={act.onClick}
        className="rounded-xl font-medium text-xs gap-1.5"
      >
        {buttonContent}
      </Button>
    )
  }

  return (
    <div
      className={cn(
        'text-center flex flex-col items-center justify-center border border-dashed border-border/80 bg-card/60 backdrop-blur-xs rounded-2xl md:rounded-3xl',
        compact ? 'py-8 px-4 space-y-3' : 'py-14 sm:py-16 px-6 space-y-4',
        className
      )}
    >
      <div
        className={cn(
          'rounded-2xl bg-muted/80 text-muted-foreground border border-border/50 flex items-center justify-center shadow-xs transition-transform hover:scale-105',
          compact ? 'size-11' : 'size-14'
        )}
      >
        <Icon className={cn(compact ? 'size-5' : 'size-6', 'text-foreground/70')} />
      </div>

      <div className="space-y-1 max-w-md">
        <h3
          className={cn(
            'font-semibold text-foreground tracking-tight',
            compact ? 'text-sm' : 'text-base sm:text-lg'
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {children && <div className="w-full max-w-sm pt-1">{children}</div>}

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {action && renderAction(action, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      )}
    </div>
  )
}
