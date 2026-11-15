import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitContactMessage } from '../api/contact.api'
import { contactQueries } from '../api/contact.queries'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Send, CheckCircle2, User, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react'
import type { ContactMessage } from '@/types/database.types'

const INQUIRY_TOPICS = [
  'Vehicle Inspection',
  'Price & Lease Options',
  'Trade-In Valuation',
  'DMT Paperwork',
  'General Question',
]

export function ContactForm() {
  const queryClient = useQueryClient()
  const [submitted, setSubmitted] = useState(false)
  const [createdMessage, setCreatedMessage] = useState<ContactMessage | null>(null)
  const [selectedTopic, setSelectedTopic] = useState(INQUIRY_TOPICS[0])

  const contactMutation = useMutation({
    mutationFn: async (values: {
      name: string
      email: string
      phone: string
      subject: string
      message: string
    }) => {
      const res = await submitContactMessage({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        subject: values.subject,
        message: values.message,
      })
      if (res.error) throw res.error
      return res.data
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: contactQueries.all })
      setCreatedMessage(created)
      setSubmitted(true)
      toast.success('Inquiry delivered successfully!', {
        description: `Reference #${created?.id || 'Registered'}. Our Colombo team will respond shortly.`,
      })
    },
    onError: (err: any) => {
      toast.error('Failed to send message', { description: err.message })
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: INQUIRY_TOPICS[0],
      message: '',
    },
    onSubmit: async ({ value }) => {
      contactMutation.mutate(value)
    },
  })

  if (submitted) {
    return (
      <Card className="p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-emerald-500/30 bg-card text-center space-y-4 shadow-xl">
        <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle2 className="size-7" />
        </div>
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
            REF #{createdMessage?.id || 'IBD-INQ'}
          </span>
          <h3 className="text-xl font-semibold text-foreground">Inquiry Received</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out. A showroom advisor has received your message and will contact you via email or phone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
          <Button asChild className="rounded-xl text-xs font-semibold gap-1.5 h-10">
            <Link to="/track">
              <span>Track Live Status</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false)
              form.reset()
            }}
            className="rounded-xl text-xs font-semibold h-10"
          >
            Send Another Message
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-5 sm:p-7 rounded-2xl md:rounded-3xl border border-border/70 bg-card space-y-5 shadow-xs">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Ask questions about vehicles, arrange a mechanic visit, or discuss trade-in pricing.
        </p>
      </div>

      {/* 1-Tap Topic Selector Pills */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-foreground">Inquiry Category</Label>
        <div className="flex flex-wrap gap-1.5">
          {INQUIRY_TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic
            return (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setSelectedTopic(topic)
                  form.setFieldValue('subject', topic)
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-xs'
                    : 'bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/80'
                }`}
              >
                {topic}
              </button>
            )
          })}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-3.5"
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? 'Full name is required' : undefined),
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-xs font-semibold">Your Name</Label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Kasun Fernando"
                  autoComplete="name"
                  className="pl-9 h-10 rounded-xl text-xs bg-background"
                  required
                />
              </div>
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => (!value.includes('@') ? 'Valid email required' : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name} className="text-xs font-semibold">Email Address</Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="pl-9 h-10 rounded-xl text-xs bg-background"
                    required
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name} className="text-xs font-semibold">Phone (WhatsApp)</Label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="077 123 4567"
                    autoComplete="tel"
                    className="pl-9 h-10 rounded-xl text-xs bg-background"
                  />
                </div>
              </div>
            )}
          </form.Field>
        </div>

        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) => (!value ? 'Message is required' : undefined),
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="text-xs font-semibold">Message</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Mention the vehicle model, questions about the inspection hoist, or financing options..."
                className="min-h-[85px] rounded-xl text-xs resize-none bg-background"
                required
              />
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          disabled={contactMutation.isPending}
          className="w-full h-11 rounded-xl font-semibold text-xs sm:text-sm gap-2 shadow-sm transition-all"
        >
          {contactMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Delivering Message...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
