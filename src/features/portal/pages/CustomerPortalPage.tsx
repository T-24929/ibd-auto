import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/features/auth'
import { appointmentQueries } from '@/features/appointments/api/appointments.queries'
import { contactQueries } from '@/features/contact/api/contact.queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Mail, Search } from 'lucide-react'
import {
  PortalHeader,
  PortalGuestBanner,
  PortalQuickStats,
  PortalEmptyState,
  PortalInquiriesTab,
  AppointmentCard,
  TrackLookupForm,
} from '../index'
import { ErrorState } from '@/components/feedback'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function CustomerPortalPage() {
  const { user, profile } = useAuth()
  const guestEmail = typeof window !== 'undefined' ? localStorage.getItem('abc_guest_email') || '' : ''
  const email = user?.email || guestEmail
  const uid = user?.id || null
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTab, setSelectedTab] = useState('appointments')

  const {
    data: appointments = [],
    isLoading: apptsLoading,
    isError: apptsError,
    error: apptErr,
    refetch: refetchAppts,
  } = useQuery(appointmentQueries.user(uid, email))

  const {
    data: inquiries = [],
    isLoading: inqsLoading,
    isError: inqsError,
    error: inqErr,
    refetch: refetchInqs,
  } = useQuery(contactQueries.user(email))

  const isLoading = apptsLoading || inqsLoading
  const isError = apptsError || inqsError

  const loadData = () => {
    refetchAppts()
    refetchInqs()
  }

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      gsap.from('.portal-anim-card', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
      })
    },
    { scope: containerRef, dependencies: [] }
  )

  if (isError && !isLoading) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <ErrorState
          title="Unable to Load Portal Data"
          description="Could not synchronize your bookings and messages with our servers. Please try again."
          error={apptErr || inqErr}
          onRetry={loadData}
          homeHref="/"
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      {/* 1. Clean minimal header */}
      <div className="portal-anim-card">
        <PortalHeader userName={profile?.full_name?.split(' ')[0]} />
      </div>

      {/* 2. Spatial Dashboard Cards (Antigravity Design) */}
      <div className="portal-anim-card">
        <PortalQuickStats
          inspectionCount={appointments.length}
          inquiryCount={inquiries.length}
          onSelectTab={setSelectedTab}
        />
      </div>

      {/* 3. Guest Mode Banner (When unauthenticated) */}
      {!user && (
        <div className="portal-anim-card">
          <PortalGuestBanner />
        </div>
      )}

      {/* 4. Minimal shadcn Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6 portal-anim-card"
      >
        <div className="overflow-x-auto no-scrollbar">
          <TabsList className="h-10 w-full sm:w-auto grid grid-cols-3 min-w-[360px] sm:min-w-0 p-1 bg-muted/60 border border-border/50 rounded-xl">
            <TabsTrigger value="appointments" className="gap-1.5 text-xs font-medium">
              <Calendar className="size-3.5" />
              <span>Inspections</span>
              {appointments.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                  {appointments.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-1.5 text-xs font-medium">
              <Mail className="size-3.5" />
              <span>Inquiries</span>
              {inquiries.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                  {inquiries.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="lookup" className="gap-1.5 text-xs font-medium">
              <Search className="size-3.5" />
              <span>Track Reference</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Inspections */}
        <TabsContent value="appointments" className="space-y-4 outline-none">
          {appointments.length === 0 ? (
            <PortalEmptyState onSwitchToTrack={() => setSelectedTab('lookup')} />
          ) : (
            <div className="grid gap-4">
              {appointments.map((appt) => (
                <AppointmentCard
                  key={appt.id}
                  appointment={appt}
                  onStatusChange={loadData}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Inquiries */}
        <TabsContent value="inquiries" className="space-y-4 outline-none">
          <PortalInquiriesTab inquiries={inquiries} />
        </TabsContent>

        {/* Tab 3: Track by Reference */}
        <TabsContent value="lookup" className="space-y-4 outline-none">
          <TrackLookupForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
