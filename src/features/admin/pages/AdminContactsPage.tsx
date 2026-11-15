import { useQuery } from '@tanstack/react-query'
import { ContactMessageList } from '../components/ContactMessageList'
import { contactQueries } from '@/features/contact/api/contact.queries'
import { MessageSquare } from 'lucide-react'
import { ErrorState } from '@/components/feedback'

export function AdminContactsPage() {
  const { data: messages = [], isLoading, isError, error, refetch } = useQuery(contactQueries.list())

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          <MessageSquare className="size-4" />
          <span>Customer Communications</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Contact Inquiries
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          View inquiries submitted by prospective buyers via the website contact form.
        </p>
      </div>

      {isLoading ? (
        <div className="h-64 rounded-3xl bg-muted/60 animate-pulse" />
      ) : isError ? (
        <ErrorState
          title="Failed to Load Inquiries"
          description="Could not fetch customer messages from the database. Please try again."
          error={error}
          onRetry={refetch}
          homeHref="/admin"
        />
      ) : (
        <ContactMessageList messages={messages} onRefresh={refetch} />
      )}
    </div>
  )
}
