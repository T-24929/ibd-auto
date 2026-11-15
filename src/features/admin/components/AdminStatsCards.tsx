import { Card } from '@/components/ui/card'
import type { AdminStats } from '../types/admin.types'
import { Car, CalendarClock, MessageSquare, CheckCircle } from 'lucide-react'

interface AdminStatsCardsProps {
  stats: AdminStats
}

export function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  const cards = [
    {
      title: 'Total Vehicle Inventory',
      value: stats.totalVehicles,
      sub: `${stats.availableVehicles} available, ${stats.reservedVehicles} reserved`,
      icon: Car,
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Pending Appointments',
      value: stats.pendingAppointments,
      sub: `${stats.totalAppointments} total inspection visits logged`,
      icon: CalendarClock,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: 'Cars Handed Over (Sold)',
      value: stats.soldVehicles,
      sub: 'Official transfers finalized',
      icon: CheckCircle,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Unread Customer Inquiries',
      value: stats.unreadMessages,
      sub: 'Awaiting sales desk response',
      icon: MessageSquare,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <Card
            key={i}
            className="p-5 rounded-2xl md:rounded-3xl border-border/60 bg-card/80 backdrop-blur-md space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {c.title}
              </span>
              <div className={`p-2 rounded-xl ${c.color}`}>
                <Icon className="size-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-semibold text-foreground">{c.value}</div>
              <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
