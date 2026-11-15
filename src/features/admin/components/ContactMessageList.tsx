import { useState, useMemo } from 'react'
import type { ContactMessage } from '@/types/database.types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { markMessageRead } from '@/features/contact/api/contact.api'
import { toast } from 'sonner'
import { Mail, Phone, Calendar, Check, Inbox } from 'lucide-react'
import { EmptyState } from '@/components/feedback'

interface ContactMessageListProps {
  messages: ContactMessage[]
  onRefresh: () => void
}

export function ContactMessageList({ messages, onRefresh }: ContactMessageListProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const counts = useMemo(() => ({
    all: messages.length,
    unread: messages.filter((m) => !m.is_read).length,
    read: messages.filter((m) => m.is_read).length,
  }), [messages])

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      if (filter === 'unread') return !m.is_read
      if (filter === 'read') return m.is_read
      return true
    })
  }, [messages, filter])

  const handleToggleRead = async (id: string, current: boolean) => {
    const { error } = await markMessageRead(id, !current)
    if (error) {
      toast.error('Failed to update message status')
    } else {
      toast.success(current ? 'Marked as unread' : 'Marked as read')
      onRefresh()
    }
  }

  return (
    <div className="space-y-3.5">
      {/* Filter Tabs with Counters */}
      <div className="flex gap-1.5">
        {(['all', 'unread', 'read'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === tab
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                filter === tab
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={filter !== 'all' ? `No ${filter} Messages` : 'Inbox is Clean'}
            description={
              filter !== 'all'
                ? `You have no ${filter} inquiries right now.`
                : 'No customer messages have arrived yet. Inquiries will appear here.'
            }
            action={
              filter !== 'all'
                ? {
                    label: 'Show All Messages',
                    onClick: () => setFilter('all'),
                    variant: 'outline',
                  }
                : undefined
            }
            compact
          />
        ) : (
          filtered.map((msg) => {
            const initials = (msg.name || 'CU').slice(0, 2).toUpperCase()
            return (
              <div
                key={msg.id}
                className={`p-4 rounded-2xl border transition-all ${
                  msg.is_read
                    ? 'border-border/60 bg-card'
                    : 'border-primary/40 bg-primary/5 shadow-xs'
                } space-y-2.5`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-xs">{msg.name}</span>
                        {!msg.is_read && (
                          <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.2">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-0.5">
                        <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:underline">
                          <Mail className="size-2.5 text-primary" />
                          <span>{msg.email}</span>
                        </a>
                        {msg.phone && (
                          <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:underline">
                            <Phone className="size-2.5 text-primary" />
                            <span>{msg.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:self-center">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="size-3" />
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleRead(msg.id, msg.is_read)}
                      className="h-7 px-2 rounded-lg text-xs gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {msg.is_read ? (
                        <>
                          <Mail className="size-3" />
                          <span>Mark Unread</span>
                        </>
                      ) : (
                        <>
                          <Check className="size-3 text-emerald-500" />
                          <span>Mark Read</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="pt-1 text-xs pl-10.5">
                  <h4 className="font-semibold text-xs text-foreground">
                    Subject: {msg.subject}
                  </h4>
                  <p className="text-muted-foreground mt-1 whitespace-pre-line leading-relaxed text-[11px]">
                    {msg.message}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
