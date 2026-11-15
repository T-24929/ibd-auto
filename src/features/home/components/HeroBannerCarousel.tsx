import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface HeroSlide {
  id: string
  title: string
  titleLine2: string
  desc: string
  descLine2: string
  image: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Buy verified',
    titleLine2: 'cars in Sri Lanka.',
    desc: 'Every vehicle is mechanically inspected with verified ownership books.',
    descLine2: 'Test drive at our showroom before deciding.',
    image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide-2',
    title: 'Direct from Japan',
    titleLine2: '& European auctions.',
    desc: 'Original auction verification and clear DMT registry books.',
    descLine2: 'Hybrid and luxury vehicles ready for immediate transfer.',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide-3',
    title: 'Drive with total',
    titleLine2: 'peace of mind.',
    desc: 'OBD-II computer diagnostics and hybrid battery testing.',
    descLine2: 'Bring your own mechanic to inspect on our showroom hoist.',
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85',
  },
]

export function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5500)
    return () => clearInterval(timer)
  }, [isPaused, current])

  const slide = HERO_SLIDES[current]

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative lg:col-span-8 rounded-2xl sm:rounded-[32px] overflow-hidden min-h-[300px] sm:min-h-[320px] md:min-h-[380px] p-4 sm:p-8 md:p-12 flex flex-col justify-end text-white shadow-lg bg-neutral-950 group touch-manipulation"
    >
      {/* Background Image Carousel with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Multi-layer Dark Gradient for Readability with Text at the Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content Brought Down to the Lower Portion */}
      <div className="relative z-10 space-y-2 sm:space-y-3 max-w-xl mb-3 sm:mb-6 pt-6 sm:pt-14">
        <motion.div
          key={`content-${slide.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-1 sm:space-y-2.5"
        >
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight text-white leading-tight sm:leading-[1.14]">
            {slide.title} {slide.titleLine2}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-snug sm:leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
            <span>{slide.desc}</span>{' '}
            <span className="hidden sm:inline">{slide.descLine2}</span>
          </p>
        </motion.div>
      </div>

      {/* Carousel Controls (Pill Indicators & Quick Nav) */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Progress Bar / Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current
                  ? 'w-5 sm:w-7 bg-white'
                  : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Previous / Next Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="size-7 sm:size-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/10"
          >
            <ChevronLeft className="size-3.5 sm:size-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="size-7 sm:size-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/10"
          >
            <ChevronRight className="size-3.5 sm:size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
