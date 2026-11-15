import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { formatLKRInLakhs } from '@/lib/formatters'
import { CalendarCheck, PhoneCall, Car, ChevronUp } from 'lucide-react'
import type { Vehicle } from '@/types/database.types'

interface VehicleDetailStickyFABProps {
  vehicle: Vehicle
  onBookInspection: () => void
  onContactNow: () => void
}

export function VehicleDetailStickyFAB({
  vehicle,
  onBookInspection,
  onContactNow,
}: VehicleDetailStickyFABProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCardInView, setIsCardInView] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('Overview')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Observe in-page "Schedule a Test Drive" static card
    const targetCard = document.getElementById('schedule-test-drive-card')
    let cardObserver: IntersectionObserver | null = null

    if (targetCard) {
      cardObserver = new IntersectionObserver(
        ([entry]) => {
          setIsCardInView(entry.isIntersecting)
        },
        { threshold: 0.15 }
      )
      cardObserver.observe(targetCard)
    }

    // Observe sections for active card tracking (sync with cards on scroll)
    const sections = [
      { id: 'vehicle-card-gallery', label: 'Photos' },
      { id: 'vehicle-card-overview', label: 'Overview' },
      { id: 'vehicle-card-specs', label: 'Specs' },
      { id: 'vehicle-card-roadmap', label: 'Roadmap' },
      { id: 'vehicle-card-related', label: 'Similar' },
    ]

    const sectionElements = sections
      .map((s) => ({ el: document.getElementById(s.id), label: s.label }))
      .filter((s): s is { el: HTMLElement; label: string } => !!s.el)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sectionElements.find((s) => s.el === entry.target)
            if (match) {
              setActiveSection(match.label)
            }
          }
        }
      },
      { rootMargin: '-20% 0px -50% 0px' }
    )

    sectionElements.forEach((s) => sectionObserver.observe(s.el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cardObserver?.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  // Show FAB when scrolled past top AND the static card is not in full view
  const shouldShow = isScrolled && !isCardInView

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.aside
          initial={{ y: 90, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          aria-label="Vehicle booking bar"
          className="fixed bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-auto sm:right-6 sm:w-[420px] max-w-lg z-50 pointer-events-auto"
        >
          <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl p-3 sm:p-3.5 space-y-2.5 transition-shadow hover:shadow-3xl">
            {/* Top Row: Vehicle Info, Price & Active Section Sync */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                title="Scroll to top"
                className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer group"
              >
                {vehicle.images?.[0] ? (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    className="size-10 rounded-xl object-cover border border-border/60 shrink-0 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="size-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Car className="size-5 text-muted-foreground" />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h4>
                  <p className="text-xs font-bold text-foreground">
                    LKR {formatLKRInLakhs(vehicle.price)}
                  </p>
                </div>
              </button>

              {/* Synchronized Card Section Badge */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeSection}</span>
                </span>
                <button
                  type="button"
                  onClick={scrollToTop}
                  title="Back to top"
                  className="size-7 rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronUp className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Row: CTAs Synced with Card */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <Button
                type="button"
                size="sm"
                onClick={onBookInspection}
                className="rounded-xl h-10 font-semibold text-xs bg-foreground text-background hover:bg-foreground/90 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="size-3.5" />
                <span className="truncate">Book Inspection</span>
              </Button>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onContactNow}
                className="rounded-xl h-10 font-semibold text-xs border-border/80 hover:bg-muted/60 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all"
              >
                <PhoneCall className="size-3.5 text-primary" />
                <span className="truncate">Contact Now</span>
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
