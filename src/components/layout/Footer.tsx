import { FooterPreCallout } from './footer/FooterPreCallout'
import { FooterNavGrid } from './footer/FooterNavGrid'

export function Footer() {
  return (
    <footer className="relative bg-[#0e0e11] text-white border-t border-white/10 pt-16 md:pt-24 pb-12 mt-16 md:mt-24">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-20">
        {/* Pre-Footer Callout & Brand Strip */}
        <FooterPreCallout />

        {/* 5-Column Navigation Grid with Brand Description */}
        <FooterNavGrid />

        {/* Bottom Bar Matching Screenshot */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="hover:text-zinc-200 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-zinc-200 transition-colors cursor-pointer">
              Returns and refunds
            </span>
            <span>•</span>
            <span className="hover:text-zinc-200 transition-colors cursor-pointer">
              Terms and conditions
            </span>
            <span>•</span>
            <span className="hover:text-zinc-200 transition-colors cursor-pointer">
              DMT & RMV Verification
            </span>
          </div>

          <div className="text-zinc-400">
            © {new Date().getFullYear()} IBD Auto (Pvt) Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
