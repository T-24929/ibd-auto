import { createFileRoute } from '@tanstack/react-router'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { NotFoundView, ErrorState } from '@/components/feedback'

function PublicRouteError({ error, reset }: { error: any; reset?: () => void }) {
  return (
    <div className="py-16 px-4 max-w-2xl mx-auto">
      <ErrorState
        title="Page Error"
        description="We couldn't display this section of the showroom. Please try again or return to inventory."
        error={error}
        onRetry={reset}
        homeHref="/vehicles"
      />
    </div>
  )
}

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
  notFoundComponent: NotFoundView,
  errorComponent: PublicRouteError,
})
