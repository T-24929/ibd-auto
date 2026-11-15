import { Link, useRouter } from '@tanstack/react-router'
import { Car, Compass, CalendarCheck, PhoneCall, ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundView() {
  const router = useRouter()

  const quickLinks = [
    {
      title: 'Showroom Stock',
      desc: 'Browse 20+ verified cars with DMT inspection papers',
      href: '/vehicles',
      icon: Car,
    },
    {
      title: 'Track Appointment',
      desc: 'Check the status of your test-drive booking or RMV clearance',
      href: '/track',
      icon: CalendarCheck,
    },
    {
      title: 'Showroom Contact Desk',
      desc: 'Connect with our Nugegoda showroom advisors',
      href: '/contact',
      icon: PhoneCall,
    },
  ]

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Status Pill & Icon */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Compass className="size-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>404 • Destination Not Found</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Looking for a vehicle or page?
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            The link you followed may have expired, or the car has already been sold and cleared from our active inventory.
          </p>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {quickLinks.map((item) => {
            const ItemIcon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href as any}
                viewTransition
                className="group p-4 rounded-2xl border border-border/70 bg-card hover:bg-muted/40 hover:border-primary/40 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ItemIcon className="size-4" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {item.desc}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Primary Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.history.back()}
            className="rounded-xl h-10 px-4 text-xs font-semibold gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            <span>Go Back</span>
          </Button>

          <Button asChild className="rounded-xl h-10 px-5 text-xs font-semibold gap-1.5 shadow-sm">
            <Link to="/vehicles" viewTransition>
              <Search className="size-3.5" />
              <span>Browse All Vehicles</span>
            </Link>
          </Button>

          <Button asChild variant="ghost" className="rounded-xl h-10 px-4 text-xs font-semibold gap-1.5">
            <Link to="/" viewTransition>
              <Home className="size-3.5" />
              <span>Showroom Home</span>
            </Link>
          </Button>
        </div>

        {/* Showroom Hotline */}
        <p className="text-xs text-muted-foreground pt-4 border-t border-border/40">
          Need immediate support? Call our hotline:{' '}
          <a href="tel:+94112345678" className="font-semibold text-foreground hover:underline">
            +94 11 234 5678
          </a>{' '}
          (Mon – Sat 8:30 AM – 6:30 PM)
        </p>
      </div>
    </div>
  )
}
