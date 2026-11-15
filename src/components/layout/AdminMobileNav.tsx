import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { AdminSidebar } from './AdminSidebar'

interface AdminMobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminMobileNav({ open, onOpenChange }: AdminMobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-72 p-0 flex flex-col h-full bg-card border-r border-border focus:outline-none"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Admin Navigation</SheetTitle>
        </SheetHeader>
        <AdminSidebar onItemClick={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  )
}
