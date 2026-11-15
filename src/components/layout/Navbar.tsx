import { Link, useRouterState } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useAuth } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Shield, User, Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { DesktopNavLinks } from './DesktopNavLinks'
import { MobileNavDrawer } from './MobileNavDrawer'
import ProfileDropdown from '@/components/kokonutui/profile-dropdown'

export function Navbar() {
  const { user, profile, isAdmin, logout } = useAuth()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const nextDark = !root.classList.contains('dark')
    root.classList.toggle('dark', nextDark)
    root.classList.toggle('theme-dark', nextDark)
    root.classList.toggle('theme-light', !nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
    setIsDark(nextDark)
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'Bookings', path: '/track' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/90 backdrop-blur-md transition-colors pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-6">
        {/* Brand Logo (Matching Screenshot: clean mark + IBD AUTO LK) */}
        <Link to="/" className="flex items-center gap-2 group">
          <BrandLogo />
        </Link>

        {/* Desktop Navigation Links (Home, About, Vehicles, Bookings, Contact) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <DesktopNavLinks links={navLinks} />

          {/* Discreet Actions (Theme + Auth / Portal) */}
          <div className="flex items-center gap-3 pl-3 border-l border-border/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="size-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
              title="Toggle theme"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            {user ? (
              <ProfileDropdown
                minimal
                accounts={[
                  {
                    id: user.id || 'user',
                    name: profile?.full_name || user.email?.split('@')[0] || 'User',
                    email: user.email || '',
                    plan: isAdmin ? 'Admin' : 'Verified Buyer',
                  },
                ]}
                items={[
                  {
                    label: 'Buyer Portal',
                    icon: <User className="size-4" />,
                    href: '/portal',
                  },
                  ...(isAdmin
                    ? [
                        {
                          label: 'Admin Workspace',
                          icon: <Shield className="size-4" />,
                          href: '/admin',
                        },
                      ]
                    : []),
                ]}
                onSignOut={() => logout()}
              />
            ) : (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full h-8 text-xs font-semibold px-3 gap-1.5 border-border/80 hover:bg-muted active:scale-[0.98] transition-all cursor-pointer"
              >
                <Link to="/login">
                  <User className="size-3.5" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="size-9 p-0 rounded-xl"
            title="Toggle theme"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {!user ? (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="size-9 p-0 rounded-xl text-muted-foreground hover:text-foreground"
              title="Sign in"
            >
              <Link to="/login">
                <User className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="size-9 p-0 rounded-xl text-muted-foreground hover:text-foreground"
              title="My Portal"
            >
              <Link to="/portal">
                <User className="size-4" />
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="size-9 p-0 rounded-xl active:scale-95 transition-transform"
            title="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.85 }}
                  transition={{ duration: 0.16 }}
                >
                  <X className="size-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.85 }}
                  transition={{ duration: 0.16 }}
                >
                  <Menu className="size-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Smooth Mobile Slide-Down Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        isActive={isActive}
      />
    </header>
  )
}
