import { Check, Car, BadgeDollarSign, Image as ImageIcon, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const VEHICLE_FORM_STEPS = [
  {
    step: 1,
    id: 'identity',
    title: 'Identity & Specs',
    shortTitle: 'Specs',
    description: 'Make, model, year & powertrain',
    icon: Car,
  },
  {
    step: 2,
    id: 'valuation',
    title: 'Valuation & Status',
    shortTitle: 'Pricing',
    description: 'Price, condition & documents',
    icon: BadgeDollarSign,
  },
  {
    step: 3,
    id: 'media',
    title: 'Photos & Features',
    shortTitle: 'Gallery',
    description: 'Images, description & equipment',
    icon: ImageIcon,
  },
  {
    step: 4,
    id: 'review',
    title: 'Review & Publish',
    shortTitle: 'Review',
    description: 'Final confirmation & listing',
    icon: Sparkles,
  },
] as const

interface VehicleStepperHeaderProps {
  currentStep: number
  onStepClick: (step: number) => void
  completedSteps: Set<number>
}

export function VehicleStepperHeader({
  currentStep,
  onStepClick,
  completedSteps,
}: VehicleStepperHeaderProps) {
  const progressPercent = ((currentStep - 1) / (VEHICLE_FORM_STEPS.length - 1)) * 100

  return (
    <div className="space-y-4">
      {/* Progress Track */}
      <div className="relative h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Stepper Tabs */}
      <nav aria-label="Progress" className="grid grid-cols-4 gap-2 sm:gap-3">
        {VEHICLE_FORM_STEPS.map((s) => {
          const Icon = s.icon
          const isCurrent = currentStep === s.step
          const isCompleted = completedSteps.has(s.step)
          const isAccessible = isCompleted || s.step <= currentStep

          return (
            <button
              key={s.id}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick(s.step)}
              className={cn(
                'group flex flex-col items-start p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 select-none',
                isCurrent
                  ? 'border-primary/50 bg-primary/5 shadow-xs ring-1 ring-primary/20'
                  : isCompleted
                    ? 'border-border/70 bg-card hover:bg-muted/40 cursor-pointer'
                    : 'border-border/30 bg-muted/20 opacity-60 cursor-not-allowed',
              )}
            >
              <div className="flex items-center gap-2 w-full">
                <span
                  className={cn(
                    'size-6 sm:size-7 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 transition-colors',
                    isCurrent
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isCompleted
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground',
                  )}
                >
                  {isCompleted ? <Check className="size-3.5 stroke-[3]" /> : <Icon className="size-3.5" />}
                </span>

                <span className="text-[10px] sm:text-xs font-mono font-medium text-muted-foreground uppercase">
                  Step 0{s.step}
                </span>
              </div>

              <span className="font-semibold text-xs sm:text-sm text-foreground tracking-tight mt-1.5 truncate w-full">
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.shortTitle}</span>
              </span>

              <span className="hidden md:inline text-[11px] text-muted-foreground truncate w-full mt-0.5">
                {s.description}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
