import { createFileRoute } from '@tanstack/react-router'
import { TrackBookingPage } from '@/features/portal'

export const Route = createFileRoute('/_public/track')({
  component: TrackBookingPage,
})
