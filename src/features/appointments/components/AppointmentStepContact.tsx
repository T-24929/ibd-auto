import React, { useState } from 'react'
import { User, Phone, FileText, ArrowLeft, CalendarCheck, Loader2 } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AppointmentStepContactProps {
  name: string
  setName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  notes: string
  setNotes: (v: string) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function AppointmentStepContact({
  name,
  setName,
  phone,
  setPhone,
  notes,
  setNotes,
  onBack,
  onSubmit,
  isSubmitting,
}: AppointmentStepContactProps) {
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let isValid = true

    if (!name.trim()) {
      setNameError('Full name is required')
      isValid = false
    } else if (name.trim().length < 2) {
      setNameError('Please enter at least 2 characters')
      isValid = false
    } else {
      setNameError('')
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (!phone.trim()) {
      setPhoneError('Phone / WhatsApp number is required')
      isValid = false
    } else if (cleanPhone.length < 9) {
      setPhoneError('Please enter a valid 10-digit number (e.g. 077 123 4567)')
      isValid = false
    } else {
      setPhoneError('')
    }

    if (isValid) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleValidateAndSubmit} className="space-y-4">
      {/* Name Input */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name" className="text-xs font-semibold text-foreground flex items-center justify-between">
          <span>Full Name</span>
          {nameError && (
            <span className="text-[11px] text-destructive font-normal">{nameError}</span>
          )}
        </Label>
        <div className="relative flex items-center">
          <User className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (nameError) setNameError('')
            }}
            placeholder="e.g. Samantha Perera"
            className="h-10 pl-9 rounded-xl text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Phone Input */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-phone" className="text-xs font-semibold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>Phone / WhatsApp</span>
            <WhatsAppIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
          </span>
          {phoneError && (
            <span className="text-[11px] text-destructive font-normal">{phoneError}</span>
          )}
        </Label>
        <div className="relative flex items-center">
          <Phone className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (phoneError) setPhoneError('')
            }}
            placeholder="077 123 4567"
            className="h-10 pl-9 rounded-xl text-xs sm:text-sm font-mono"
          />
        </div>
      </div>

      {/* Optional Note */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-note" className="text-xs font-semibold text-muted-foreground">
          Special Requests / Note (Optional)
        </Label>
        <div className="relative flex items-center">
          <FileText className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
          <Input
            id="contact-note"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Bringing my mechanic, or trade-in evaluation"
            className="h-10 pl-9 rounded-xl text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="rounded-xl h-11 px-4 text-xs font-semibold gap-1.5 shrink-0"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back</span>
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl h-11 font-semibold text-xs sm:text-sm gap-2 shadow-xs transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Reserving Slot...</span>
            </>
          ) : (
            <>
              <CalendarCheck className="size-4" />
              <span>Confirm Free Inspection</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
