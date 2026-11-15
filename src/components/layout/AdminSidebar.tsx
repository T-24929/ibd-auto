import { Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAuth } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand/BrandLogo'
import {
  Car,
  LayoutDashboard,
  CalendarClock,
  MessageSquare,
  ArrowLeft,
  LogOut,
  Sun,
  Moon,
  X,
} from 'lucide-react'

interface AdminSidebarProps {
  onItemClick?: () => void
}

export function AdminSidebar({ onItemClick }: AdminSidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { user, profile, logout } = useAuth()
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

  const navLinks = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Vehicle Inventory', path: '/admin/vehicles', icon: Car },
    { label: 'Appointments', path: '/admin/appointments', icon: CalendarClock },
    { label: 'Customer Messages', path: '/admin/contacts', icon: MessageSquare },
  ]

  const isActive = (path: string) => {
    if (path === '/admin') return pathname === '/admin'
    return pathname.startsWith(path)
  }

  const initials = (profile?.full_name || user?.email || 'Admin')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside className="w-full md:w-64 h-full bg-card border-r border-border/60 p-4 md:p-5 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-6">
        {/* Dealership Admin Brand + Clean Mobile Close */}
        <div className="flex items-center justify-between px-1 pt-1">
          <Link to="/admin" onClick={onItemClick} className="flex items-center gap-2.5 min-w-0">
            <BrandLogo subtitle="Admin Console" />
          </Link>

          {onItemClick && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onItemClick}
              className="size-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer -mr-1"
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onItemClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Profile & Unclamped Account Controls */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        {/* User Identity - Clean & Full Width */}
        <div className="flex items-center gap-3 px-1">
          <div className="size-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-xs text-foreground truncate">
              {profile?.full_name || 'Staff Member'}
            </div>
            <div className="text-[11px] text-muted-foreground truncate">
              {user?.email || 'admin@ibdauto.com'}
            </div>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="flex-1 h-8 px-2 rounded-lg gap-1.5 text-xs justify-start text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Link to="/" onClick={onItemClick}>
              <ArrowLeft className="size-3.5 shrink-0" />
              <span className="truncate">Showroom</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            title="Toggle theme"
          >
            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => logout()}
            className="size-8 rounded-lg text-muted-foreground hover:text-destructive cursor-pointer shrink-0"
            title="Sign out"
          >
            <LogOut className="size-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
