import type { ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import type { Vehicle, VehicleStatus } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { formatLKR, formatKM } from '@/lib/formatters'
import { Edit2, Trash2, ExternalLink, Loader2 } from 'lucide-react'

interface GetVehicleColumnsProps {
  onStatusChange: (id: string, status: VehicleStatus) => void
  onDelete: (id: string, title: string) => void
  isStatusUpdating: boolean
  isDeleting: boolean
}

export function getVehicleColumns({
  onStatusChange,
  onDelete,
  isStatusUpdating,
  isDeleting,
}: GetVehicleColumnsProps): ColumnDef<Vehicle>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Vehicle',
      cell: ({ row }) => {
        const v = row.original
        const img =
          v.images?.[0] ||
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'
        return (
          <div className="flex items-center gap-3">
            <img
              src={img}
              alt={v.title}
              className="size-11 rounded-xl object-cover border border-border/40 shrink-0 bg-muted"
            />
            <div className="min-w-0">
              <span className="font-semibold text-foreground block truncate">
                {v.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {v.make} • {v.model} {v.reg_number ? `• ${v.reg_number}` : ''}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'price',
      header: 'Price (Rs.)',
      cell: ({ row }) => (
        <span className="font-bold text-foreground text-xs">
          {formatLKR(row.original.price)}
        </span>
      ),
    },
    {
      accessorKey: 'mileage',
      header: 'Mileage',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatKM(row.original.mileage)}
        </span>
      ),
    },
    {
      accessorKey: 'condition',
      header: 'Condition',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground capitalize">
          {row.original.condition || 'Used'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const v = row.original
        return (
          <select
            value={v.status}
            disabled={isStatusUpdating}
            onChange={(e) =>
              onStatusChange(v.id, e.target.value as VehicleStatus)
            }
            className={`text-xs rounded-lg px-2 py-1 font-semibold border cursor-pointer focus:outline-none capitalize ${
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
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const v = row.original
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              title="View live page"
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
        )
      },
    },
  ]
}
