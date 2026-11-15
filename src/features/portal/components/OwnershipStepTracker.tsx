import { CheckCircle2, Clock, ShieldCheck, Key, FileText, Banknote } from 'lucide-react'
import type { OwnershipStage } from '../types/portal.types'

interface OwnershipStepTrackerProps {
  currentStage?: OwnershipStage
  vehicleTitle?: string
}

const STEPS = [
  {
    key: 'INSPECTION',
    title: '1. Physical Inspection',
    desc: 'Showroom visit, road test drive & diagnostic scan.',
    icon: Clock,
  },
  {
    key: 'NEGOTIATION',
    title: '2. Valuation & Pricing',
    desc: 'Trade-in appraisal & final price agreement.',
    icon: Banknote,
  },
  {
    key: 'HOLDING_DEPOSIT',
    title: '3. Holding Token',
    desc: 'Deposit placed; vehicle locked as RESERVED.',
    icon: ShieldCheck,
  },
  {
    key: 'DOCUMENTATION',
    title: '4. RMV Title Transfer',
    desc: 'MTA 6 & MTA 8 forms, CR clearance & insurance.',
    icon: FileText,
  },
  {
    key: 'HANDOVER',
    title: '5. Keys & Delivery',
    desc: 'Final settlement, warranty booklet & handover.',
    icon: Key,
  },
] as const

export function OwnershipStepTracker({
  currentStage = 'INSPECTION',
  vehicleTitle,
}: OwnershipStepTrackerProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStage)

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
        <div>
          <h4 className="text-sm md:text-base font-semibold text-foreground">
            Vehicle Acquisition Pipeline
          </h4>
          {vehicleTitle && (
            <p className="text-xs text-primary font-medium">{vehicleTitle}</p>
          )}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary self-start sm:self-auto">
          Stage {currentIndex + 1} of 5: {STEPS[currentIndex]?.title.replace(/^\d\.\s*/, '')}
        </span>
      </div>

      {/* Pipeline Progress Indicator */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Overall Acquisition Progress</span>
          <span className="font-mono font-semibold text-foreground">
            {Math.round(((currentIndex + 1) / STEPS.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pipeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentIndex
          const isCurrent = idx === currentIndex
          const Icon = step.icon

          return (
            <div
              key={step.key}
              className={`relative rounded-xl p-3.5 border transition-all ${
                isCurrent
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                  : isDone
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-border/40 bg-muted/30 opacity-70'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`size-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground animate-pulse'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="size-3.5" /> : idx + 1}
                </div>
                <Icon
                  className={`size-3.5 ${
                    isCurrent ? 'text-primary' : isDone ? 'text-emerald-600' : 'text-muted-foreground'
                  }`}
                />
              </div>

              <h5
                className={`text-xs font-semibold ${
                  isCurrent ? 'text-primary' : isDone ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </h5>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                {step.desc}
              </p>

              {isCurrent && (
                <div className="mt-2 text-[10px] font-semibold text-primary uppercase tracking-wider">
                  ● In Progress
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
