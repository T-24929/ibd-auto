import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-7 md:p-10 shadow-lg">
      <div className="relative z-10 max-w-2xl space-y-3">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Want to see a vehicle in person?
        </h2>
        <p className="text-sm text-primary-foreground/90 leading-relaxed">
          Book a free showroom test drive or reach our sales desk directly. We will have the car ready when you arrive.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            className="rounded-xl bg-background text-foreground hover:bg-background/90 shadow font-semibold h-11 px-5 gap-2"
          >
            <Link to="/vehicles">
              <span>View all vehicles</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/30 text-white hover:bg-white/10 font-semibold h-11 px-5 gap-2"
          >
            <Link to="/contact">
              <Phone className="size-4" />
              <span>Contact desk</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
