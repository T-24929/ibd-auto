import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface PortalHeaderProps {
  userName?: string | null
}

export function PortalHeader({ userName }: PortalHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {userName ? `Welcome, ${userName}` : 'Buyer Portal'}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Your test drives, hoist inspections, and vehicle documents.
        </p>
      </div>

      <Button
        asChild
        size="sm"
        className="rounded-xl h-9 px-4 text-xs font-semibold gap-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 self-start sm:self-auto cursor-pointer"
      >
        <Link to="/vehicles">
          <span>Browse Showroom</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    </div>
  )
}
