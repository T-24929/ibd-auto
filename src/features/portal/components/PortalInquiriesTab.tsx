import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowRight } from 'lucide-react'
import { InquiryCard } from './InquiryCard'
import type { ContactMessage } from '@/types/database.types'

interface PortalInquiriesTabProps {
  inquiries: ContactMessage[]
}

export function PortalInquiriesTab({ inquiries }: PortalInquiriesTabProps) {
  if (inquiries.length === 0) {
    return (
      <Card className="rounded-2xl sm:rounded-3xl border border-border/70 bg-card p-6 sm:p-8 text-center space-y-4 max-w-xl mx-auto shadow-xs">
        <div className="mx-auto size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <MessageSquare className="size-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            No Open Inquiries
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Have questions about pricing, leasing, trade-in valuations, or specific model trims? Our consultants reply within 15 minutes.
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="rounded-xl h-10 px-5 text-xs font-semibold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Link to="/contact">
            <span>Send an Inquiry</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="grid gap-3">
      {inquiries.map((inq) => (
        <InquiryCard key={inq.id} inquiry={inq} />
      ))}
    </div>
  )
}
