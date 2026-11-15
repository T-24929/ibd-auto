import { Card } from '@/components/ui/card'
import { ShieldCheck } from 'lucide-react'
import { OwnershipStepTracker } from './OwnershipStepTracker'
import type { Appointment } from '@/types/database.types'

interface PortalPipelineTabProps {
  appointments: Appointment[]
}

export function PortalPipelineTab({ appointments }: PortalPipelineTabProps) {
  return (
    <div className="space-y-4">
      <OwnershipStepTracker
        currentStage={appointments[0]?.status === 'confirmed' ? 'INSPECTION' : 'NEGOTIATION'}
        vehicleTitle={appointments[0]?.vehicle?.title || 'Selected Certified Vehicle'}
      />

      <Card className="p-5 md:p-6 rounded-2xl sm:rounded-3xl border-border/60 bg-muted/20 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="font-semibold text-sm text-foreground">
            How IBD Auto Protects Your Acquisition:
          </h4>
        </div>
        <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
          <li>
            <strong className="text-foreground">Zero Obligation Inspections:</strong> Schedule and inspect on our hoist without paying any advance reservation charge.
          </li>
          <li>
            <strong className="text-foreground">Official Vehicle Hoist & Mechanic Scans:</strong> Bring your independent automobile technician to inspect undercarriage and mechanical soundness.
          </li>
          <li>
            <strong className="text-foreground">RMV Documentation Guarantee:</strong> All legal ownership transfer papers (MTA 6, MTA 8, CR verification) completed with official clearance before handover.
          </li>
        </ul>
      </Card>
    </div>
  )
}
