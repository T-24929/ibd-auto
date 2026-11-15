import { Outlet, useRouterState } from '@tanstack/react-router'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFab } from '@/components/common/WhatsAppFab'

export function PublicLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isVehicleDetailPage = pathname.startsWith('/vehicles/') && pathname !== '/vehicles'

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
      <Footer />
      {!isVehicleDetailPage && <WhatsAppFab />}
    </div>
  )
}
