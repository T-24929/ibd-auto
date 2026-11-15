import { Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import { getWhatsAppUrl } from '@/lib/formatters'

export function ContactQuickActions() {
  const waUrl = getWhatsAppUrl(
    '94779876543',
    'Hello IBD Auto! I am visiting your website and have an inquiry regarding a vehicle.'
  )

  const actions = [
    {
      title: 'WhatsApp Hotline',
      subtitle: 'Instant reply in <5 mins',
      detail: '+94 77 987 6543',
      href: waUrl,
      isExternal: true,
      icon: WhatsAppIcon,
      accentClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/15',
      badge: 'Fastest',
      badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    },
    {
      title: 'Call Sales Desk',
      subtitle: 'Mon–Sat: 8:30am–6:30pm',
      detail: '+94 11 234 5678',
      href: 'tel:+94112345678',
      isExternal: false,
      icon: Phone,
      accentClass: 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/15',
      badge: 'Direct',
      badgeClass: 'bg-primary/10 text-foreground',
    },
    {
      title: 'Showroom',
      subtitle: 'Walk-ins welcome',
      detail: 'Galle Rd, Colombo 03',
      href: 'https://maps.google.com/?q=Colombo+03+Sri+Lanka',
      isExternal: true,
      icon: MapPin,
      accentClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 group-hover:bg-blue-500/15',
      badge: 'Open Today',
      badgeClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {actions.map((act) => {
        const Icon = act.icon
        return (
          <a
            key={act.title}
            href={act.href}
            target={act.isExternal ? '_blank' : undefined}
            rel={act.isExternal ? 'noopener noreferrer' : undefined}
            className="group relative flex flex-col justify-between p-4 rounded-2xl border border-border/70 bg-card hover:border-border transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className={`size-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 shrink-0 ${act.accentClass}`}>
                <Icon className="size-5" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${act.badgeClass}`}>
                  {act.badge}
                </span>
                <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>

            <div className="space-y-0.5 text-left">
              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {act.title}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {act.subtitle}
              </p>
              <p className="text-xs font-mono font-medium text-foreground/90 pt-1">
                {act.detail}
              </p>
            </div>
          </a>
        )
      })}
    </div>
  )
}
