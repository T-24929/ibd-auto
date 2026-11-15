import { motion } from 'framer-motion'
import { ShieldCheck, FileCheck2, Car, FileSignature } from 'lucide-react'
import { cn } from '@/lib/utils'

const guarantees = [
  {
    icon: ShieldCheck,
    tag: '150-point check',
    title: 'Hoist inspection',
    text: 'Engine, gearbox, brakes, and computer diagnostics checked on our hoist. Full scan report included.',
  },
  {
    icon: FileCheck2,
    tag: 'Clean title',
    title: 'Verified DMT papers',
    text: 'Original CR book verified with zero bank loans, debt, or outstanding fines.',
  },
  {
    icon: Car,
    tag: 'Mechanic welcome',
    title: 'Open test drive',
    text: 'Bring your own technician, put the car on our hoist, and test drive on open roads.',
  },
  {
    icon: FileSignature,
    tag: 'Forms filed',
    title: 'DMT transfer handled',
    text: 'We prepare and submit official MTA 6 and MTA 8 transfer papers directly with the DMT.',
  },
]

export function WhyChooseUs({ className }: { className?: string }) {
  return (
    <section className={cn('space-y-4 sm:space-y-5', className)}>
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Every car checked before you buy
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
          Inspected on our workshop hoist, verified with the DMT, and open for your mechanic to review.
        </p>
      </div>

      {/* Minimal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {guarantees.map((item) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl border border-border/70 bg-card hover:border-foreground/20 hover:shadow-xs transition-colors cursor-default space-y-3"
            >
              {/* Top: Icon + Tag */}
              <div className="flex items-center justify-between gap-2">
                <span className="size-8 rounded-xl bg-muted/80 border border-border/50 flex items-center justify-center text-foreground shrink-0">
                  <Icon className="size-4" />
                </span>
                <span className="text-[10px] font-medium text-muted-foreground bg-muted/40 border border-border/40 px-2 py-0.5 rounded-full shrink-0">
                  {item.tag}
                </span>
              </div>

              {/* Title & Straight Copy */}
              <div className="space-y-1">
                <h3 className="font-semibold text-xs sm:text-sm tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default WhyChooseUs
