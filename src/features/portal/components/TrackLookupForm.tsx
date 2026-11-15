import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, Car, CalendarSearch } from 'lucide-react'
import { EmptyState, ErrorState } from '@/components/feedback'
import { lookupAppointment } from '@/features/appointments/api/appointments.api'
import { fetchUserContactMessages } from '@/features/contact/api/contact.api'
import type { Appointment, ContactMessage } from '@/types/database.types'
import { AppointmentCard } from './AppointmentCard'
import { InquiryCard } from './InquiryCard'

export function TrackLookupForm() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [foundAppointment, setFoundAppointment] = useState<Appointment | null>(null)
  const [foundInquiries, setFoundInquiries] = useState<ContactMessage[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setErrorMessage('')
    setSearched(true)
    setFoundAppointment(null)
    setFoundInquiries([])

    // 1. Try looking up appointment
    const { data: appt } = await lookupAppointment(query)
    if (appt) {
      setFoundAppointment(appt)
    }

    // 2. If email or phone, also search inquiries
    if (query.includes('@')) {
      const { data: inqs } = await fetchUserContactMessages(query)
      if (inqs && inqs.length > 0) {
        setFoundInquiries(inqs)
      }
    }

    if (!appt && (!query.includes('@') || foundInquiries.length === 0)) {
      setErrorMessage(
        'No active records found matching that reference or phone number. Please check the spelling or contact our sales desk directly.'
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-border/60 bg-card shadow-md space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            Track Booking or Inquiry Status
          </h3>
          <p className="text-xs text-muted-foreground">
            Enter your <strong>Booking Reference (e.g. IBD-APPT-975718)</strong>, registered phone number (e.g. 0771234567), or email.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. IBD-APPT-975718 or 0771234567"
              className="pl-9 h-11 rounded-xl text-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="rounded-xl h-11 px-6 font-semibold text-xs gap-2 shrink-0"
          >
            {isLoading && <Loader2 className="size-3.5 animate-spin" />}
            <span>Track Now</span>
          </Button>
        </form>
      </Card>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          {errorMessage && (
            <ErrorState
              title="Lookup Failed"
              description={errorMessage}
              onRetry={() => { handleSearch() }}
              compact
            />
          )}

          {foundAppointment && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Matched Inspection Appointment
              </h4>
              <AppointmentCard appointment={foundAppointment} />
            </div>
          )}

          {foundInquiries.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Matched Inquiries
              </h4>
              <div className="grid gap-3">
                {foundInquiries.map((inq) => (
                  <InquiryCard key={inq.id} inquiry={inq} />
                ))}
              </div>
            </div>
          )}

          {!foundAppointment && foundInquiries.length === 0 && !errorMessage && !isLoading && (
            <EmptyState
              icon={CalendarSearch}
              title="No Booking or Inquiry Found"
              description={`We couldn't find any active test-drive appointment or message linked to "${query}". Please check the reference code (e.g. IBD-APPT-XXXXXX) or the phone number provided at booking.`}
              action={{
                label: 'Browse Vehicles & Book',
                href: '/vehicles',
                icon: Car,
              }}
              secondaryAction={{
                label: 'Contact Support Desk',
                href: '/contact',
              }}
              compact
            />
          )}
        </div>
      )}
    </div>
  )
}
