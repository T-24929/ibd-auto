export function FooterPreCallout() {
  const brands = [
    { name: 'TOYOTA', label: 'Toyota Verified' },
    { name: 'HONDA', label: 'Honda Certified' },
    { name: 'NISSAN', label: 'Nissan Motors' },
    { name: 'BMW', label: 'BMW M Sport' },
    { name: 'MERCEDES', label: 'Mercedes-Benz' },
    { name: 'MITSUBISHI', label: 'Mitsubishi' },
  ]

  return (
    <div className="text-center max-w-3xl mx-auto space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
          Join 1,200+ car owners<br />
          growing their journey with us
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Get premium verified vehicles at transparent prices — 150-point mechanical
          inspection, clear ownership books, and dedicated support for your vehicle.
        </p>
      </div>

      {/* Brand Logos Row Matching Screenshot */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2 opacity-75">
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 cursor-default group"
          >
            <span className="size-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
            <span className="text-xs font-semibold tracking-widest uppercase">
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
