import { Card } from '@/components/ui/card'

export function Stats() {
  const stats = [
    { value: '1,400+', label: 'Cars sold', desc: 'Across Sri Lanka' },
    { value: '150-pt', label: 'Mechanical scan', desc: 'Engine, brakes & OBD' },
    { value: '100%', label: 'Clear title', desc: 'Verified DMT records' },
    { value: '12 yrs', label: 'In business', desc: 'Showroom in Colombo 03' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, idx) => (
        <Card
          key={idx}
          className="p-5 text-center rounded-2xl border-border/60 bg-card/60 backdrop-blur-md space-y-0.5"
        >
          <div className="text-2xl md:text-3xl font-semibold text-primary">{s.value}</div>
          <div className="text-xs font-medium text-foreground">{s.label}</div>
          <div className="text-[11px] text-muted-foreground">{s.desc}</div>
        </Card>
      ))}
    </div>
  )
}
