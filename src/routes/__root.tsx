import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { NotFoundView, ErrorState } from '@/components/feedback'

export interface RouterContext {
  queryClient: QueryClient
}

function RootErrorComponent({ error, reset }: { error: any; reset?: () => void }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <ErrorState
          title="Showroom System Interruption"
          description="An unexpected error occurred while loading this view. You can retry the current operation or return to the showroom home."
          error={error}
          onRetry={reset}
          homeHref="/"
        />
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
      <Toaster position="top-right" />
    </>
  ),
  notFoundComponent: NotFoundView,
  errorComponent: RootErrorComponent,
})
