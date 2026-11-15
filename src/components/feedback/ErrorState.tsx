import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AlertTriangle, RotateCcw, Home, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error | string | null
  onRetry?: () => void
  homeHref?: string
  compact?: boolean
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected issue prevented this view from loading properly. You can try refreshing or return to the main showroom.',
  error,
  onRetry,
  homeHref = '/',
  compact = false,
  className,
}: ErrorStateProps) {
  const [showDetails, setShowDetails] = useState(false)
  const errorMessage = typeof error === 'string' ? error : error?.message

  return (
    <div
      className={cn(
        'text-center flex flex-col items-center justify-center border border-destructive/20 bg-destructive/5 rounded-2xl md:rounded-3xl',
        compact ? 'py-6 px-4 space-y-3' : 'py-12 sm:py-16 px-6 space-y-4',
        className
      )}
    >
      <div
        className={cn(
          'rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center shadow-xs',
          compact ? 'size-10' : 'size-14'
        )}
      >
        <AlertTriangle className={cn(compact ? 'size-5' : 'size-6')} />
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
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        {onRetry && (
          <Button
            type="button"
            size={compact ? 'sm' : 'default'}
            onClick={onRetry}
            className="rounded-xl text-xs font-semibold gap-1.5 shadow-sm"
          >
            <RotateCcw className="size-3.5" />
            <span>Try Again</span>
          </Button>
        )}

        {homeHref && (
          <Button
            asChild
            variant="outline"
            size={compact ? 'sm' : 'default'}
            className="rounded-xl text-xs font-semibold gap-1.5"
          >
            <Link to={homeHref as any} viewTransition>
              <Home className="size-3.5" />
              <span>Back to Home</span>
            </Link>
          </Button>
        )}
      </div>

      {errorMessage && (
        <div className="w-full max-w-md pt-2 text-left">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors mx-auto block"
          >
            <span>{showDetails ? 'Hide technical diagnostics' : 'Show technical diagnostics'}</span>
            {showDetails ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          {showDetails && (
            <div className="mt-2 p-3 rounded-xl bg-background border border-border/80 text-[11px] font-mono text-destructive/90 overflow-x-auto whitespace-pre-wrap break-all shadow-inner">
              <p className="font-semibold text-foreground/80 mb-1">Error Details:</p>
              {errorMessage}
              {error instanceof Error && error.stack && (
                <p className="mt-2 text-muted-foreground text-[10px] opacity-75">{error.stack}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
