import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { AdminMetricsCards } from '../components/AdminMetricsCards'
import { VehicleTable } from '../components/VehicleTable'
import { AppointmentTable } from '../components/AppointmentTable'
import { ContactMessageList } from '../components/ContactMessageList'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'
import { appointmentQueries } from '@/features/appointments/api/appointments.queries'
import { contactQueries } from '@/features/contact/api/contact.queries'
import type { AdminStats } from '../types/admin.types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  CalendarClock,
  Car,
  MessageSquare,
} from 'lucide-react'
import { ErrorState } from '@/components/feedback'

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'appointments' | 'inventory' | 'inquiries'
  >('appointments')

  const {
    data: vehicles = [],
    isLoading: vehLoading,
    isError: vehError,
    error: vehErr,
    refetch: refetchVehicles,
  } = useQuery(vehicleQueries.list())
  const {
    data: appointments = [],
    isLoading: apptLoading,
    isError: apptError,
    error: apptErr,
    refetch: refetchAppts,
  } = useQuery(appointmentQueries.list())
  const {
    data: messages = [],
    isLoading: msgLoading,
    isError: msgError,
    error: msgErr,
    refetch: refetchMsgs,
  } = useQuery(contactQueries.list())

  const isLoading = vehLoading || apptLoading || msgLoading
  const isError = vehError || apptError || msgError
  const anyError = vehErr || apptErr || msgErr

  const handleRefresh = () => {
    refetchVehicles()
    refetchAppts()
    refetchMsgs()
  }

  if (isError && !isLoading) {
    return (
      <div className="space-y-6">
        <ErrorState
          title="Failed to Load Dashboard Data"
          description="Could not aggregate showroom metrics, vehicle inventory, or appointments from the database."
          error={anyError}
          onRetry={handleRefresh}
          homeHref="/admin"
        />
      </div>
    )
  }

  const stats: AdminStats = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter((v) => v.status === 'available').length,
    reservedVehicles: vehicles.filter((v) => v.status === 'reserved').length,
    soldVehicles: vehicles.filter((v) => v.status === 'sold').length,
    pendingAppointments: appointments.filter((a) => a.status === 'pending')
      .length,
    totalAppointments: appointments.length,
    unreadMessages: messages.filter((m) => !m.is_read).length,
  }

  const viewAllLink =
    activeTab === 'appointments'
      ? { label: 'Full Appointments View', path: '/admin/appointments' }
      : activeTab === 'inventory'
        ? { label: 'Manage All Vehicles', path: '/admin/vehicles' }
        : { label: 'All Customer Inquiries', path: '/admin/contacts' }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <ShieldCheck className="size-4" />
            <span>Dealership Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Operational Overview
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live fleet status, upcoming test drives, and inventory management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="rounded-xl h-9 text-xs gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground"
            title="Refresh database records"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button
            asChild
            size="sm"
            className="rounded-xl h-9 text-xs gap-1.5 font-semibold shadow-sm cursor-pointer"
          >
            <Link to="/admin/vehicles/new">
              <Plus className="size-4" />
              <span>Add Vehicle</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Clean Minimal Metric KPI Cards (2x2 Mobile, 4-col Desktop) */}
      <AdminMetricsCards
        stats={stats}
        vehicles={vehicles}
        appointments={appointments}
      />

      {/* Operational Streams: Clean Tabbed Workspace */}
      <div className="space-y-4 pt-2">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as any)}
          className="w-full space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-start gap-3 border-b border-border/50 pb-3">
            <TabsList className="bg-muted/50  overflow-scroll sm:pl-1 pl-12  scrollbar-none rounded-xl h-auto">
              <TabsTrigger
                value="appointments"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
              >
                <CalendarClock className="size-3.5" />
                <span>Appoinments</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary/10 text-primary">
                  {appointments.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
              >
                <Car className="size-3.5" />
                <span>Vehicles</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary/10 text-primary">
                  {vehicles.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
              >
                <MessageSquare className="size-3.5" />
                <span>Inquiries</span>
                {stats.unreadMessages > 0 ? (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold">
                    {stats.unreadMessages} new
                  </span>
                ) : (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-muted text-muted-foreground">
                    {messages.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 text-xs gap-1 text-primary cursor-pointer"
              >
                <Link to={viewAllLink.path}>
                  <span>{viewAllLink.label}</span>
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Tab 1: Appointments Table */}
          <TabsContent value="appointments" className="mt-0 focus:outline-none">
            {isLoading ? (
              <div className="h-56 rounded-2xl bg-muted/40 animate-pulse border border-border/40" />
            ) : (
              <AppointmentTable
                appointments={appointments.slice(0, 10)}
                onRefresh={handleRefresh}
              />
            )}
          </TabsContent>

          {/* Tab 2: Vehicles Inventory Table */}
          <TabsContent value="inventory" className="mt-0 focus:outline-none">
            {isLoading ? (
              <div className="h-56 rounded-2xl bg-muted/40 animate-pulse border border-border/40" />
            ) : (
              <VehicleTable
                vehicles={vehicles.slice(0, 10)}
                onRefresh={handleRefresh}
              />
            )}
          </TabsContent>

          {/* Tab 3: Customer Messages */}
          <TabsContent value="inquiries" className="mt-0 focus:outline-none">
            {isLoading ? (
              <div className="h-56 rounded-2xl bg-muted/40 animate-pulse border border-border/40" />
            ) : (
              <ContactMessageList
                messages={messages.slice(0, 10)}
                onRefresh={handleRefresh}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
