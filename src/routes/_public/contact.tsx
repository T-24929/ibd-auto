import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '@/features/contact'

export const Route = createFileRoute('/_public/contact')({
  component: ContactPage,
})
