import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useAuth } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { CalendarCheck, Shield, LogOut } from 'lucide-react'

interface NavLinkItem {
  label: string
  path: string
}

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavLinkItem[]
  isActive: (path: string) => boolean
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  navLinks,
  isActive,
}: MobileNavDrawerProps) {
  const { user, profile, isAdmin, logout } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav-drawer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="md:hidden overflow-hidden border-t border-border/50 bg-background/98 backdrop-blur-2xl shadow-xl"
        >
          <div className="p-4 space-y-3">
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.035, delayChildren: 0.04 },
                },
                closed: {
                  transition: { staggerChildren: 0.02, staggerDirection: -1 },
                },
              }}
              className="flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -6 },
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                      isActive(link.path)
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive(link.path) && (
                      <span className="size-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {user && (
                <motion.div
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -6 },
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    to="/portal"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-primary bg-primary/10 active:scale-[0.98] transition-all"
                  >
                    <CalendarCheck className="size-4" />
                    <span>My Portal & Inquiries</span>
                  </Link>
                </motion.div>
              )}

              {isAdmin && (
                <motion.div
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -6 },
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-primary bg-primary/10 active:scale-[0.98] transition-all"
                  >
                    <Shield className="size-4" />
                    <span>Admin Portal</span>
                  </Link>
                </motion.div>
              )}
            </motion.nav>

            <div className="pt-2.5 border-t border-border/40 flex flex-col gap-2">
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    logout()
                    onClose()
                  }}
                  className="w-full h-10 rounded-xl gap-2 text-xs font-semibold"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out ({profile?.full_name || user.email})</span>
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 rounded-xl text-xs font-semibold"
                    onClick={onClose}
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="h-10 rounded-xl text-xs font-semibold"
                    onClick={onClose}
                  >
                    <Link to="/vehicles">Browse Cars</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
