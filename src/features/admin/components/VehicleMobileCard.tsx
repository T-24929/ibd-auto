import { Link } from '@tanstack/react-router'
import type { Vehicle, VehicleStatus } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { formatLKR, formatKM } from '@/lib/formatters'
import { Edit2, Trash2, ExternalLink, Loader2 } from 'lucide-react'

interface VehicleMobileCardProps {
  vehicle: Vehicle
  onStatusChange: (id: string, status: VehicleStatus) => void
  onDelete: (id: string, title: string) => void
  isDeleting?: boolean
}

export function VehicleMobileCard({
  vehicle: v,
  onStatusChange,
  onDelete,
  isDeleting = false,
}: VehicleMobileCardProps) {
  const img =
    v.images?.[0] ||
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'

  return (
    <div className="p-3.5 space-y-3 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3">
        <img
          src={img}
          alt={v.title}
          className="size-14 rounded-xl object-cover border border-border/40 shrink-0 bg-muted"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-xs text-foreground truncate">
            {v.title}
          </h4>
          <p className="text-[11px] text-muted-foreground truncate mt-0.5">
            {v.make} • {v.model} {v.reg_number ? `• ${v.reg_number}` : ''}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-xs text-foreground">
              {formatLKR(v.price)}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {formatKM(v.mileage)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40">
        <select
          value={v.status}
          onChange={(e) => onStatusChange(v.id, e.target.value as VehicleStatus)}
          className={`text-[11px] rounded-lg px-2 py-1 font-semibold border cursor-pointer focus:outline-none capitalize ${
            v.status === 'available'
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              : v.status === 'reserved'
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-muted text-muted-foreground border-border/60'
          }`}
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            title="View Live Page"
          >
            <Link to="/vehicles/$id" params={{ id: v.id }}>
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            title="Edit Vehicle"
          >
            <Link to="/admin/vehicles/$id/edit" params={{ id: v.id }}>
              <Edit2 className="size-3.5" />
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={() => onDelete(v.id, v.title)}
            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-destructive cursor-pointer"
            title="Delete Vehicle"
          >
            {isDeleting ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
