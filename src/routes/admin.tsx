import { createFileRoute } from '@tanstack/react-router'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { EmptyState, ErrorState } from '@/components/feedback'
import { LayoutDashboard, FileQuestion } from 'lucide-react'

function AdminError({ error, reset }: { error: any; reset?: () => void }) {
  return (
    <div className="py-12 px-4 max-w-2xl mx-auto">
      <ErrorState
        title="Admin Workspace Error"
        description="A management module encountered an error while processing data. You can retry or head back to the dashboard."
        error={error}
        onRetry={reset}
        homeHref="/admin"
      />
    </div>
  )
}

function AdminNotFound() {
  return (
    <div className="py-12 px-4 max-w-2xl mx-auto">
      <EmptyState
        icon={FileQuestion}
        title="Admin Record Not Found"
        description="The vehicle record, appointment, or management view you were looking for does not exist or has been deleted."
        action={{
          label: 'Back to Dashboard',
          href: '/admin',
          icon: LayoutDashboard,
        }}
      />
    </div>
  )
}

export const Route = createFileRoute('/admin')({
  component: () => (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  errorComponent: AdminError,
  notFoundComponent: AdminNotFound,
})
