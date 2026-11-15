import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'

export function PortalGuestBanner() {
  return (
    <Card className="rounded-xl border border-border/60 bg-muted/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-amber-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Guest Session
          </span>
        </div>
        <p className="text-xs sm:text-sm text-foreground font-medium">
          Sign in to keep your bookings, gate passes, and vehicle inquiries synced across devices.
        </p>
      </div>

      <Button
        asChild
        size="sm"
        className="rounded-lg h-9 px-4 text-xs font-semibold gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
      >
        <Link to="/login">
          <LogIn className="size-3.5" />
          <span>Sign In / Register</span>
        </Link>
      </Button>
    </Card>
  )
}
