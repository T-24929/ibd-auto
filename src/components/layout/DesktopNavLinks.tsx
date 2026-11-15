import { Link, useRouterState } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export interface NavLinkItem {
  label: string
  path: string
}

interface DesktopNavLinksProps {
  links: NavLinkItem[]
}

export function DesktopNavLinks({ links }: DesktopNavLinksProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="flex items-center gap-7 lg:gap-9">
      {links.map((link) => {
        const active = isActive(link.path)

        return (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              'group relative py-2 text-sm lg:text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md',
              active
                ? 'text-foreground font-semibold'
                : 'text-foreground/75 hover:text-foreground',
            )}
          >
            {/* Subtle Text Flip / Roll on Hover */}
            <span className="relative grid overflow-hidden leading-snug">
              <span className="col-start-1 row-start-1 transition-transform duration-250 ease-out group-hover:-translate-y-full motion-reduce:transform-none">
                {link.label}
              </span>
              <span
                aria-hidden="true"
                className="col-start-1 row-start-1 translate-y-full transition-transform duration-250 ease-out group-hover:translate-y-0 text-primary font-semibold motion-reduce:hidden"
              >
                {link.label}
              </span>
            </span>

            {/* Accessible Animated Underline */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-primary transition-all duration-300 ease-out origin-center pointer-events-none',
                active
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 motion-reduce:transition-opacity motion-reduce:scale-x-100',
              )}
            />
          </Link>
        )
      })}
    </nav>
  )
}
