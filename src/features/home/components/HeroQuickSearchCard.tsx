import { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { useVehicles } from '@/features/vehicles'
import { formatLKRInLakhs } from '@/lib/formatters'
import { Search, SlidersHorizontal } from 'lucide-react'

interface HeroQuickSearchCardProps {
  onOpenFilterModal: () => void
}

export function HeroQuickSearchCard({ onOpenFilterModal }: HeroQuickSearchCardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { allVehicles } = useVehicles()

  const quickProducts = allVehicles.slice(0, 4)
  const matchingVehicles = searchQuery.trim()
    ? allVehicles
        .filter(
          (v) =>
            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.body_type.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 4)
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate({
        to: '/vehicles',
        search: { search: searchQuery.trim() },
      })
    } else {
      onOpenFilterModal()
    }
  }

  return (
    <div className="relative lg:col-span-4 rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#22232a] via-[#141418] to-[#0a0a0c] p-4 sm:p-7 lg:p-8 flex flex-col justify-between text-white min-h-0 lg:min-h-[380px] shadow-lg border border-white/5 group">
      {/* Subtle Automotive Background Illustration */}
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-[32px] overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="absolute -top-12 -right-12 size-56 rounded-full bg-white/[0.04] blur-3xl" />
        <svg
          viewBox="0 0 320 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-4 -right-4 w-60 sm:w-72 pointer-events-none select-none"
        >
          <defs>
            <linearGradient id="minimalCarGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d="M30 115 C 80 112, 130 52, 205 52 C 265 52, 295 90, 315 105"
            stroke="url(#minimalCarGlow)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M75 125 C 120 120, 160 82, 215 82 C 260 82, 290 106, 310 118"
            stroke="#ffffff"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Heading & Subtitle */}
      <div className="relative z-10 space-y-1 mb-2.5 sm:mb-4 pt-1 sm:pt-4">
        <h2 className="text-base sm:text-xl lg:text-2xl font-semibold tracking-tight text-white leading-tight">
          Looking for a specific vehicle?
        </h2>
        <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed max-w-xs hidden sm:block">
          Filter our showroom inventory by price, body type, or guided search
        </p>
      </div>

      {/* Minimal Pill Search Bar with Floating Autocomplete Overlay */}
      <div className="relative z-30">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full h-10 sm:h-11 pl-3.5 sm:pl-4 pr-1.5 rounded-full bg-white/10 hover:bg-white/[0.14] focus-within:bg-white/[0.16] border border-white/15 focus-within:border-white/35 transition-all shadow-sm group/search"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search "Toyota", "Honda", "SUV"...'
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none pr-2"
          />

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onOpenFilterModal}
              aria-label="Guided vehicle filter"
              title="Guided Quick Look-up"
              className="size-7 sm:size-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-all cursor-pointer active:scale-95"
            >
              <SlidersHorizontal className="size-3.5" />
            </button>

            <button
              type="submit"
              aria-label="Search vehicles"
              className="size-7 sm:size-8 rounded-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              <Search className="size-3.5" />
            </button>
          </div>
        </form>

        {/* Absolute Floating Results Dropdown - Prevents Layout Shifts */}
        {matchingVehicles.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/20 p-2 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/10 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Matching Vehicles ({matchingVehicles.length})</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-zinc-400 hover:text-white text-[10px] transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="max-h-56 overflow-y-auto py-1 space-y-1 divide-y divide-white/5 scrollbar-thin">
              {matchingVehicles.map((v) => (
                <Link
                  key={v.id}
                  to="/vehicles/$id"
                  params={{ id: v.id }}
                  viewTransition
                  onClick={() => setSearchQuery('')}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 text-white transition-colors group/item"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={v.images[0]}
                      alt={v.title}
                      className="size-8 rounded-lg object-cover shrink-0 border border-white/10"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold truncate block group-hover/item:text-primary transition-colors">
                        {v.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {v.year} • {v.fuel_type} • {v.mileage.toLocaleString()} km
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary shrink-0 pl-2">
                    Rs. {formatLKRInLakhs(v.price)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick In-Stock Vehicle Pills - Always stable layout */}
      <div className="relative z-10 pt-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5 touch-manipulation">
          <span className="text-[10px] uppercase font-semibold text-zinc-400 shrink-0 mr-1 hidden sm:inline">
            In Stock:
          </span>
          {quickProducts.map((v) => (
            <Link
              key={v.id}
              to="/vehicles/$id"
              params={{ id: v.id }}
              viewTransition
              className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[11px] shrink-0 active:scale-95 transition-all"
            >
              <img
                src={v.images[0]}
                alt={v.title}
                className="size-4 rounded-full object-cover shrink-0"
              />
              <span className="font-medium truncate max-w-[95px]">
                {v.make} {v.model}
              </span>
              <span className="text-[10px] text-zinc-300 font-semibold">
                {formatLKRInLakhs(v.price)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
