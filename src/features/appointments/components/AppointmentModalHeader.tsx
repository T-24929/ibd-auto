import { X, MapPin, ArrowLeft } from 'lucide-react'
import type { Vehicle } from '@/types/database.types'
import { formatLKR } from '@/lib/formatters'

export type ModalTab = 'book' | 'track'

interface AppointmentModalHeaderProps {
  vehicle: Vehicle
  activeTab: ModalTab
  onTabChange: (tab: ModalTab) => void
  onClose?: () => void
}

export function AppointmentModalHeader({
  vehicle,
  activeTab,
  onTabChange,
  onClose,
}: AppointmentModalHeaderProps) {
  const thumbUrl =
    vehicle.images?.[0] ||
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'

  const displayTitle = vehicle.title.startsWith(String(vehicle.year))
    ? vehicle.title
    : `${vehicle.year} ${vehicle.title}`

  return (
    <div className="space-y-3 pb-3 border-b border-border/60">
      {/* Top Title & Close */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          {activeTab === 'track' ? (
            <button
              type="button"
              onClick={() => onTabChange('book')}
              className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline cursor-pointer mb-1"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to booking</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] tracking-wider uppercase">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Free Showroom Test Drive & Hoist Check</span>
            </div>
          )}

          <h2
            id="book-inspection-title"
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
          >
            {activeTab === 'book'
              ? 'Schedule Inspection'
              : 'Track Booking & Inquiries'}
          </h2>
          <p
            id="book-inspection-desc"
            className="text-xs text-muted-foreground"
          >
            {activeTab === 'book'
              ? 'No deposit required. Test drive on open roads and review full hoist scan.'
              : 'Enter your phone number or reference to check appointment status.'}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Target Vehicle Micro-Pill */}
      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-muted/40 border border-border/60">
        <img
          src={thumbUrl}
          alt={vehicle.title}
          className="size-10 rounded-lg object-cover shrink-0 border border-border/40"
        />
        <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {displayTitle}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
              <MapPin className="size-3 text-primary shrink-0" />
              <span className="truncate">{vehicle.location || 'Nugegoda Showroom'}</span>
              <span>•</span>
              <span className="font-mono">{vehicle.reg_number || 'WP Reg'}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-foreground font-mono shrink-0">
            {formatLKR(vehicle.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
