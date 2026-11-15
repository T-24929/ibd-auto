import { createFileRoute } from '@tanstack/react-router'
import { NotFoundView } from '@/components/feedback'

export const Route = createFileRoute('/_public/404')({
  component: NotFoundView,
})
