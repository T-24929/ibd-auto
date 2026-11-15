import { createFileRoute } from '@tanstack/react-router'
import { CustomerPortalPage } from '@/features/portal'

export const Route = createFileRoute('/_public/portal')({
  component: CustomerPortalPage,
})
