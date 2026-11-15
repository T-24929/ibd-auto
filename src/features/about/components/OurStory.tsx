import { CheckCircle2 } from 'lucide-react'

export function OurStory() {
  const points = [
    'Original odometer readings verified against agent service logs',
    'Chassis, engine, and electrical checks before listing',
    'Firm prices without hidden handling fees or gate charges',
    'Assistance with DMT ownership transfers and revenue licenses',
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Clear records and honest condition reports.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Buying a used car in Sri Lanka often means guessing whether the mileage is real or if the vehicle had prior structural repairs.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          At IBD Auto, we inspect every car on a hoist, verify service records with authorized agents, and check ownership titles with the Department of Motor Traffic. You are welcome to test drive and bring your own mechanic before buying.
        </p>

        <div className="space-y-2 pt-2">
          {points.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground font-medium">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-border/60 shadow-md">
        <img
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
          alt="IBD Auto inspection showroom in Colombo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
          <div className="text-white">
            <div className="font-semibold text-sm">IBD Auto Showroom</div>
            <div className="text-xs text-white/80">Kollupitiya, Colombo 03</div>
          </div>
        </div>
      </div>
    </div>
  )
}
