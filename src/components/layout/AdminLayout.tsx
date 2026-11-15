import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { AdminMobileNav } from './AdminMobileNav'

export function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="h-dvh max-h-dvh overflow-hidden flex bg-background text-foreground">
      {/* Desktop Sidebar (Fixed left, full height) */}
      <div className="hidden md:flex h-full shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      <AdminMobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

      {/* Right Column: Sticky Header + Non-Overflowing Fit-to-Screen Outlet */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AdminHeader onOpenMobileNav={() => setMobileNavOpen(true)} />

        <main className="flex-1 h-full overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8 focus:outline-none">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
