import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Clock, CheckCircle2 } from 'lucide-react'
import type { ContactMessage } from '@/types/database.types'

interface InquiryCardProps {
  inquiry: ContactMessage
}

export function InquiryCard({ inquiry }: InquiryCardProps) {
  return (
    <Card className="p-5 rounded-2xl border-border/60 bg-card shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-primary">
            REF: {inquiry.id}
          </span>
          {inquiry.is_read ? (
            <Badge className="bg-emerald-600/15 text-emerald-600 border border-emerald-500/30 text-[10px]">
              <CheckCircle2 className="size-3 mr-1" />
              Reviewed by Consultant
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-[10px]">
              <Clock className="size-3 mr-1 text-primary" />
              Under Review
            </Badge>
          )}
        </div>
        <span className="text-[11px] text-muted-foreground">
          {new Date(inquiry.created_at).toLocaleDateString('en-GB')}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <Mail className="size-3.5 text-primary shrink-0" />
          <span>{inquiry.subject}</span>
        </h4>
        <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/40 leading-relaxed whitespace-pre-wrap">
          {inquiry.message}
        </p>
      </div>
    </Card>
  )
}
