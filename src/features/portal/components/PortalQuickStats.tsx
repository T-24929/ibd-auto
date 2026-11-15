import { Calendar, MessageSquare, Search, ArrowUpRight } from 'lucide-react'

interface PortalQuickStatsProps {
  inspectionCount: number
  inquiryCount: number
  onSelectTab?: (tab: string) => void
}

export function PortalQuickStats({
  inspectionCount,
  inquiryCount,
  onSelectTab,
}: PortalQuickStatsProps) {
  const cards = [
    {
      tab: 'appointments',
      title: inspectionCount > 0 ? `${inspectionCount} Scheduled` : '0 Scheduled',
      label: 'Showroom Hoist & Test Drive',
      sub: 'Free inspection · Colombo 03',
      icon: Calendar,
      badge: inspectionCount > 0 ? 'Active' : 'Ready',
      color: 'text-emerald-500',
    },
    {
      tab: 'inquiries',
      title: inquiryCount > 0 ? `${inquiryCount} Pending` : '0 Pending',
      label: 'Consultant Desk',
      sub: 'Direct vehicle inquiries',
      icon: MessageSquare,
      badge: '15m Reply',
      color: 'text-blue-500',
    },
    {
      tab: 'lookup',
      title: 'Reference Lookup',
      label: 'Track Booking Pass',
      sub: 'Instant status by booking ID',
      icon: Search,
      badge: 'Lookup',
      color: 'text-amber-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <button
            key={c.tab}
            type="button"
            onClick={() => onSelectTab?.(c.tab)}
            className="group relative text-left p-4 sm:p-5 rounded-2xl border border-border/60 bg-card/75 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
          >
            {/* Ambient subtle glow background */}
            <div className="absolute -top-12 -right-12 size-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="size-8 rounded-xl bg-muted/80 flex items-center justify-center text-foreground group-hover:scale-105 transition-transform duration-300">
                <Icon className="size-4" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border/40">
                <span className={`size-1.5 rounded-full ${c.color} bg-current`} />
                <span>{c.badge}</span>
                <ArrowUpRight className="size-3 text-muted-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {c.title}
              </div>
              <div className="text-xs font-semibold text-foreground/90">
                {c.label}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {c.sub}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
