import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import WidgetGrid, {
  type WidgetGridItem,
  type WidgetLayoutItem,
  type WidgetSize,
} from '@/components/kokonutui/bento-grid'
import type { AdminStats } from '../types/admin.types'
import type { Vehicle, Appointment } from '@/types/database.types'
import { formatLKRInLakhs } from '@/lib/formatters'
import {
  Car,
  CalendarClock,
  MessageSquare,
  TrendingUp,
  Zap,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminBentoGridProps {
  stats: AdminStats
  vehicles: Vehicle[]
  appointments: Appointment[]
  className?: string
}

export function AdminBentoGrid({
  stats,
  vehicles,
  appointments,
  className = '',
}: AdminBentoGridProps) {
  // Calculate total inventory capital value
  const totalFleetValue = useMemo(() => {
    const sum = vehicles.reduce((acc, v) => acc + (v.price || 0), 0)
    return formatLKRInLakhs(sum)
  }, [vehicles])

  const upcomingAppt = appointments.find((a) => a.status === 'pending') || appointments[0]

  const items: WidgetGridItem[] = useMemo(
    () => [
      {
        id: 'inventory',
        title: 'Vehicle Fleet',
        icon: <Car className="size-4 text-primary" />,
        defaultSpan: 2,
        render: (_size: WidgetSize) => (
          <div className="flex flex-col justify-between h-full p-1 space-y-2">
            <div>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {stats.totalVehicles}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stats.availableVehicles} available • {stats.reservedVehicles} reserved
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Showroom Readiness</span>
                <span>
                  {stats.totalVehicles > 0
                    ? Math.round((stats.availableVehicles / stats.totalVehicles) * 100)
                    : 100}
                  %
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{
                    width: `${stats.totalVehicles > 0 ? (stats.availableVehicles / stats.totalVehicles) * 100 : 100}%`,
                  }}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{
                    width: `${stats.totalVehicles > 0 ? (stats.reservedVehicles / stats.totalVehicles) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'appointments',
        title: 'Test Drives',
        icon: <CalendarClock className="size-4 text-amber-500" />,
        defaultSpan: 2,
        render: (_size: WidgetSize) => (
          <div className="flex flex-col justify-between h-full p-1 space-y-2">
            <div>
              <div className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <span>{stats.pendingAppointments}</span>
                <span className="text-xs font-normal text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  Pending
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stats.totalAppointments} total inspection visits logged
              </p>
            </div>
            {upcomingAppt ? (
              <div className="p-2 rounded-xl bg-muted/50 border border-border/50 text-[11px] space-y-0.5">
                <span className="font-semibold text-foreground truncate block">
                  Next: {upcomingAppt.customer_name}
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {upcomingAppt.preferred_date} • {upcomingAppt.preferred_time}
                </span>
              </div>
            ) : (
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500" />
                <span>All appointments up to date</span>
              </div>
            )}
          </div>
        ),
      },
      {
        id: 'revenue',
        title: 'Inventory Value',
        icon: <TrendingUp className="size-4 text-emerald-500" />,
        defaultSpan: 2,
        render: (_size: WidgetSize) => (
          <div className="flex flex-col justify-between h-full p-1 space-y-2">
            <div>
              <div className="text-xl font-bold tracking-tight text-foreground">
                Rs. {totalFleetValue}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stats.soldVehicles} official transfers finalized
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>Full Hoist & DMT verified stock</span>
            </div>
          </div>
        ),
      },
      {
        id: 'messages',
        title: 'Customer Inquiries',
        icon: <MessageSquare className="size-4 text-indigo-500" />,
        defaultSpan: 2,
        render: (_size: WidgetSize) => (
          <div className="flex flex-col justify-between h-full p-1 space-y-2">
            <div>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {stats.unreadMessages}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Awaiting sales desk response
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full h-8 text-[11px] rounded-lg gap-1.5 justify-center"
            >
              <Link to="/admin/contacts">
                <span>Open Inquiries</span>
                <ArrowUpRight className="size-3" />
              </Link>
            </Button>
          </div>
        ),
      },
      {
        id: 'actions',
        title: 'Quick Operations',
        icon: <Zap className="size-4 text-primary" />,
        defaultSpan: 4,
        render: (_size: WidgetSize) => (
          <div className="flex flex-col justify-between h-full p-1 space-y-2.5">
            <p className="text-xs text-muted-foreground">
              Direct shortcuts for front-desk sales officers and showroom managers.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-xl h-8.5 text-xs font-semibold gap-1.5 shadow-xs"
              >
                <Link to="/admin/vehicles/new">
                  <Plus className="size-3.5" />
                  <span>Add Vehicle</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl h-8.5 text-xs gap-1.5"
              >
                <Link to="/admin/appointments">
                  <CalendarClock className="size-3.5 text-amber-500" />
                  <span>Test Drives</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl h-8.5 text-xs gap-1.5 col-span-2 sm:col-span-1"
              >
                <Link to="/admin/vehicles">
                  <Car className="size-3.5 text-primary" />
                  <span>Full Stock</span>
                </Link>
              </Button>
            </div>
          </div>
        ),
      },
    ],
    [stats, upcomingAppt, totalFleetValue]
  )

  const defaultLayout: WidgetLayoutItem[] = [
    { id: 'inventory', span: 2 },
    { id: 'appointments', span: 2 },
    { id: 'revenue', span: 2 },
    { id: 'messages', span: 2 },
    { id: 'actions', span: 4 },
  ]

  return (
    <div className={`space-y-2 ${className}`}>
      <WidgetGrid
        items={items}
        defaultLayout={defaultLayout}
        rowHeight={160}
        className="w-full max-w-none"
      />
    </div>
  )
}
