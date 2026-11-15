import { Card } from '@/components/ui/card'
import { ShieldCheck, UserCheck, Sparkles, Scale } from 'lucide-react'

export function TeamValues() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Mechanical Rigor',
      desc: 'We never cut corners. If a vehicle doesn’t pass our comprehensive diagnostic standards, it never enters our showroom.',
    },
    {
      icon: Scale,
      title: 'Fair Market Pricing',
      desc: 'Valuations anchored on real market indices and true physical condition, avoiding arbitrary markup games.',
    },
    {
      icon: UserCheck,
      title: 'Customer-First Advice',
      desc: 'Our automotive consultants do not work on pushy high-pressure commissions. We focus on finding the exact vehicle fit.',
    },
    {
      icon: Sparkles,
      title: 'Flawless Presentation',
      desc: 'Every car leaves our showroom professionally detailed, sanitized, and accompanied by verified maintenance documentation.',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          Our Guiding Principles
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          What makes IBD Auto the preferred dealership for hundreds of repeat car owners.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map((v, i) => {
          const Icon = v.icon
          return (
            <Card
              key={i}
              className="p-5 rounded-2xl md:rounded-3xl border-border/60 bg-card/60 backdrop-blur-sm space-y-3"
            >
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">{v.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
