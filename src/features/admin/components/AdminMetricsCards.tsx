import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import type { AdminStats } from '../types/admin.types'
import type { Vehicle, Appointment } from '@/types/database.types'
import { formatLKRInLakhs } from '@/lib/formatters'
import { Car, CalendarClock, MessageSquare, TrendingUp } from 'lucide-react'

interface AdminMetricsCardsProps {
  stats: AdminStats
  vehicles: Vehicle[]
  appointments: Appointment[]
}

export function AdminMetricsCards({
  stats,
  vehicles,
  appointments: _appointments,
}: AdminMetricsCardsProps) {
  const totalFleetValue = useMemo(() => {
    const sum = vehicles.reduce((acc, v) => acc + (v.price || 0), 0)
    return formatLKRInLakhs(sum)
  }, [vehicles])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* 1. Vehicle Fleet */}
      <Link to="/admin/vehicles" className="block focus:outline-none">
        <Card className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-border/60 bg-card hover:border-border hover:bg-muted/20 transition-all active:scale-[0.98] shadow-xs flex flex-col justify-between h-full gap-2 sm:gap-3 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
              Fleet
            </span>
            <div className="size-7 sm:size-8 rounded-lg sm:rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Car className="size-3.5 sm:size-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {stats.totalVehicles}
            </div>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {stats.availableVehicles} available · {stats.reservedVehicles} res.
            </p>
          </div>
        </Card>
      </Link>

      {/* 2. Test Drives */}
      <Link to="/admin/appointments" className="block focus:outline-none">
        <Card className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-border/60 bg-card hover:border-border hover:bg-muted/20 transition-all active:scale-[0.98] shadow-xs flex flex-col justify-between h-full gap-2 sm:gap-3 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
              Test Drives
            </span>
            <div className="size-7 sm:size-8 rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <CalendarClock className="size-3.5 sm:size-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
              <span>{stats.totalAppointments}</span>
              {stats.pendingAppointments > 0 && (
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/15 px-1.5 py-0.2 rounded-full">
                  {stats.pendingAppointments} new
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {stats.pendingAppointments > 0
                ? `${stats.pendingAppointments} pending review`
                : 'All caught up'}
            </p>
          </div>
        </Card>
      </Link>

      {/* 3. Valuation */}
      <div className="block">
        <Card className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-border/60 bg-card shadow-xs flex flex-col justify-between h-full gap-2 sm:gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
              Valuation
            </span>
            <div className="size-7 sm:size-8 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <TrendingUp className="size-3.5 sm:size-4" />
            </div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-bold tracking-tight text-foreground truncate">
              {totalFleetValue}
            </div>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              Verified fleet capital
            </p>
          </div>
        </Card>
      </div>

      {/* 4. Customer Inquiries */}
      <Link to="/admin/contacts" className="block focus:outline-none">
        <Card className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-border/60 bg-card hover:border-border hover:bg-muted/20 transition-all active:scale-[0.98] shadow-xs flex flex-col justify-between h-full gap-2 sm:gap-3 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
              Inquiries
            </span>
            <div className="size-7 sm:size-8 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <MessageSquare className="size-3.5 sm:size-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
              <span>{stats.unreadMessages}</span>
              {stats.unreadMessages > 0 && (
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/15 px-1.5 py-0.2 rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {stats.unreadMessages > 0
                ? `${stats.unreadMessages} need reply`
                : 'All answered'}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  )
}
