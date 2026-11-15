import { Check, Car, Banknote, MapPin } from 'lucide-react'

interface StepperHeaderProps {
  currentStep: number
  onSelectStep: (step: number) => void
}

const STEPS = [
  { id: 1, label: 'Vehicle & Model', icon: Car },
  { id: 2, label: 'Budget & Year', icon: Banknote },
  { id: 3, label: 'Location & Specs', icon: MapPin },
]

export function StepperHeader({ currentStep, onSelectStep }: StepperHeaderProps) {
  return (
    <div className="space-y-3">
      {/* Progress Bars */}
      <div className="grid grid-cols-3 gap-2">
        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className="text-left group cursor-pointer space-y-1.5 focus:outline-none"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-primary shadow-sm'
                    : isCompleted
                    ? 'bg-primary/80'
                    : 'bg-muted'
                }`}
              />
              <div className="flex items-center gap-1.5">
                <span
                  className={`size-4 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : isActive
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="size-2.5 stroke-[3]" /> : step.id}
                </span>
                <span
                  className={`text-xs font-semibold truncate transition-colors ${
                    isActive ? 'text-foreground' : isCompleted ? 'text-foreground/80' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
