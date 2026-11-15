import {
  CalendarCheck,
  Wrench,
  CheckCircle2,
  FileCheck2,
  KeyRound,
} from 'lucide-react'
import { HowItWorks02, type HowItWorksStep } from '@/components/ui/how-it-works-02'

const buyingSteps: HowItWorksStep[] = [
  {
    icon: CalendarCheck,
    title: 'Book online',
    tag: 'Free prep',
    body: 'Pick your slot online. We detail and prepare the car ready for your test drive.',
  },
  {
    icon: Wrench,
    title: 'Drive & inspect',
    tag: 'Diagnostic check',
    body: 'Test drive on open roads and review complete diagnostic inspection records.',
  },
  {
    icon: CheckCircle2,
    title: 'Upfront price',
    tag: 'Zero hidden fees',
    body: 'Clear, transparent price with no documentation markups or hidden charges.',
  },
  {
    icon: FileCheck2,
    title: 'DMT transfer',
    tag: 'Forms filed',
    body: 'We prepare all official MTA 6 and MTA 8 forms and guide official DMT transfer.',
  },
  {
    icon: KeyRound,
    title: 'Drive away',
    tag: 'Clean CR book',
    body: 'Drive home with original CR registration book, dual factory keys, and verified records.',
  },
]

export function OwnershipRoadmap() {
  return (
    <section className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-7 shadow-sm">
      <HowItWorks02
        steps={buyingSteps}
        badge="5 Simple Steps"
        title="How Buying Works"
        description="From your first test drive to official DMT title transfer—here is the exact flow."
        compact
        className="bg-transparent py-0 sm:py-0"
      />
    </section>
  )
}

export default OwnershipRoadmap
