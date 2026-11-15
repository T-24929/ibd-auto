import { createFileRoute } from '@tanstack/react-router'
import { AdminContactsPage } from '@/features/admin'
import { contactQueries } from '@/features/contact/api/contact.queries'

export const Route = createFileRoute('/admin/contacts')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(contactQueries.list())
  },
  component: AdminContactsPage,
})
