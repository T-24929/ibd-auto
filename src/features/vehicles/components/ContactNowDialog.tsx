import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import { getWhatsAppUrl, formatLKR } from '@/lib/formatters'
import type { Vehicle } from '@/types/database.types'

interface ContactNowDialogProps {
  vehicle: Vehicle
  isOpen: boolean
  onClose: () => void
}

export function ContactNowDialog({
  vehicle,
  isOpen,
  onClose,
}: ContactNowDialogProps) {
  const waMessage = `Hi IBD Auto, I'm inquiring about the ${vehicle.year} ${vehicle.title} (Price: ${formatLKR(vehicle.price)}). Is this vehicle available for inspection?`
  const waUrl = getWhatsAppUrl('94779876543', waMessage)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6 rounded-2xl border-border bg-card shadow-xl">
        <DialogHeader className="text-left space-y-1 pb-1">
          <DialogTitle className="text-lg font-semibold text-foreground tracking-tight">
            Contact Sales
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-normal">
            Get in touch with our team about the{' '}
            <span className="font-medium text-foreground">{vehicle.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2.5 pt-3">
          <Button
            asChild
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-medium cursor-pointer shadow-xs touch-manipulation active:scale-[0.98]"
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-11 rounded-xl gap-2 font-medium cursor-pointer border-border/80 hover:bg-muted touch-manipulation active:scale-[0.98]"
          >
            <a href="tel:+94779876543">
              <Phone className="size-4" />
              <span>Call +94 77 987 6543</span>
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
