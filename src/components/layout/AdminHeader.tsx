import { Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '@/features/auth'
import { Button } from '@/components/ui/button'
import {
  Menu,
  Sun,
  Moon,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'

interface AdminHeaderProps {
  onOpenMobileNav: () => void
}

const ROUTE_NAMES: Record<string, string> = {
  '/admin': 'Dashboard Overview',
  '/admin/vehicles': 'Vehicle Inventory',
  '/admin/vehicles/new': 'Add Vehicle',
  '/admin/appointments': 'Inspection Appointments',
  '/admin/contacts': 'Customer Inquiries',
}

export function AdminHeader({ onOpenMobileNav }: AdminHeaderProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { user, profile } = useAuth()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const nextDark = !root.classList.contains('dark')
    root.classList.toggle('dark', nextDark)
    root.classList.toggle('theme-dark', nextDark)
    root.classList.toggle('theme-light', !nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
    setIsDark(nextDark)
  }

  const currentTitle = ROUTE_NAMES[pathname] || 'Dealership Workspace'
  const initials = (profile?.full_name || user?.email || 'Admin')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="h-14 sm:h-16 shrink-0 border-b border-border/60 bg-card/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
      {/* Left: Mobile Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobileNav}
          className="md:hidden size-9 rounded-xl text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
          <Link
            to="/admin"
            className="flex items-center gap-1 font-medium hover:text-foreground transition-colors shrink-0"
          >
            <ShieldCheck className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60 shrink-0" />
          <span className="font-semibold text-foreground truncate">
            {currentTitle}
          </span>
        </nav>
      </div>

      {/* Right: Actions, Theme, & User Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs rounded-xl text-muted-foreground hover:text-foreground gap-1.5 hidden sm:flex cursor-pointer"
        >
          <Link to="/">
            <span>Live Showroom</span>
            <ArrowUpRight className="size-3" />
          </Link>
        </Button>

        <Button
          asChild
          size="sm"
          className="h-8 px-3 rounded-xl gap-1.5 text-xs font-semibold shadow-xs cursor-pointer hidden sm:flex"
        >
          <Link to="/admin/vehicles/new">
            <Plus className="size-3.5" />
            <span>Add Vehicle</span>
          </Link>
        </Button>

        <div className="h-4 w-px bg-border/60 mx-0.5 hidden sm:block" />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="size-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
          title="Toggle color theme"
          aria-label="Toggle color theme"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <div
          className="size-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center select-none"
          title={user?.email || 'Admin'}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}
