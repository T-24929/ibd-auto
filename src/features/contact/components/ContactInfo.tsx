import { Card } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { MapPin, Phone, Mail, Clock, ShieldCheck, Search, ArrowRight } from 'lucide-react'

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Colombo Showroom',
      lines: ['148 Galle Road, Kollupitiya', 'Colombo 03, Sri Lanka'],
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      lines: [
        'Mon – Sat: 8:30 AM – 6:30 PM',
        'Sun: By private appointment only',
      ],
    },
    {
      icon: Phone,
      title: 'Hotline Numbers',
      lines: ['Showroom: +94 11 234 5678', 'WhatsApp: +94 77 987 6543'],
    },
    {
      icon: Mail,
      title: 'Direct Email',
      lines: ['sales@ibdauto.com', 'support@ibdauto.com'],
    },
  ]

  return (
    <div className="space-y-4">
      {/* 2x2 Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contactDetails.map((item, idx) => {
          const Icon = item.icon
          return (
            <Card
              key={idx}
              className="p-4 rounded-2xl border border-border/70 bg-card space-y-2 shadow-2xs"
            >
              <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="size-4" />
              </div>
              <h4 className="font-semibold text-xs sm:text-sm text-foreground">{item.title}</h4>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {item.lines.map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Track Existing Inquiry or Booking Quick Card */}
      <Card className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-muted/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Search className="size-3.5" />
            </span>
            <h4 className="font-semibold text-xs sm:text-sm text-foreground">Have a Tracking Code?</h4>
          </div>

          <Link
            to="/track"
            viewTransition
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Track Now</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Enter your reference (e.g. <span className="font-mono text-foreground font-medium">IBD-APPT-XXXXXX</span>) to see live gate passes, mechanic inspection approvals, and DMT transfer status.
        </p>
      </Card>

      {/* Walk-in Inspection Guarantee */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-foreground font-semibold">Walk-ins welcome anytime.</strong> Bring your personal mechanic to check undercarriage condition on our hoist, scan OBD diagnostics, and review original government registration books without advance fees.
        </p>
      </div>
    </div>
  )
}
