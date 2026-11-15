import { Link } from '@tanstack/react-router'
import { BrandLogo } from '@/components/brand/BrandLogo'

export function FooterNavGrid() {
  const categories = [
    { label: 'Hybrid & EV', path: '/vehicles', search: { fuelType: 'Hybrid' } },
    { label: 'Family SUVs', path: '/vehicles', search: { bodyType: 'SUV' } },
    { label: 'Executive Sedans', path: '/vehicles', search: { bodyType: 'Sedan' } },
    { label: 'Hatchbacks', path: '/vehicles', search: { bodyType: 'Hatchback' } },
    { label: 'All Inventory', path: '/vehicles', search: {} },
  ]

  const showrooms = [
    { label: 'Main Showroom - Colombo 03', path: '/contact' },
    { label: 'City Branch - Colombo 07', path: '/contact' },
    { label: 'Kandy Branch Showroom', path: '/contact' },
    { label: 'Showcase Bay', path: '/contact' },
    { label: 'Delivery Lounge', path: '/contact' },
  ]

  const pages = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'Bookings & Track', path: '/track' },
    { label: 'Contact us', path: '/contact' },
  ]

  const quickLinks = [
    { label: 'Benefits for buyers', path: '/about' },
    { label: 'Why buy from us?', path: '/about' },
    { label: '150-Point checklist', path: '/about' },
    { label: 'DMT title transfer', path: '/about' },
    { label: "FAQ's", path: '/contact' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 pt-6">
      {/* Brand & Description (Col 1-2 on desktop) */}
      <div className="lg:col-span-2 space-y-4 pr-2">
        <Link to="/" className="inline-block group">
          <BrandLogo variant="white" />
        </Link>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
          IBD Auto offers a comprehensive selection of verified pre-owned and
          brand-new vehicles. Our showroom inventory boasts 150-point mechanical
          inspection, clear ownership books, and transparent pricing.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-zinc-200">
          Categories
        </h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          {categories.map((c) => (
            <li key={c.label}>
              <Link
                to={c.path}
                search={c.search}
                className="hover:text-white transition-colors"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Showrooms */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-zinc-200">
          Showrooms
        </h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          {showrooms.map((y) => (
            <li key={y.label}>
              <Link to={y.path} className="hover:text-white transition-colors">
                {y.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Pages */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-zinc-200">
          Pages
        </h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          {pages.map((p) => (
            <li key={p.label}>
              <Link to={p.path} className="hover:text-white transition-colors">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs tracking-wider uppercase text-zinc-200">
          Quick Links
        </h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          {quickLinks.map((q) => (
            <li key={q.label}>
              <Link to={q.path} className="hover:text-white transition-colors">
                {q.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
