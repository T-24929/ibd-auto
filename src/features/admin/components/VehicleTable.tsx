import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Vehicle, VehicleStatus } from '@/types/database.types'
import { Input } from '@/components/ui/input'
import { updateVehicle, deleteVehicle } from '@/features/vehicles/api/vehicles.api'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'
import { toast } from 'sonner'
import { Search, Car, Plus } from 'lucide-react'
import { EmptyState } from '@/components/feedback'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { VehicleMobileCard } from './VehicleMobileCard'
import { getVehicleColumns } from './vehicleColumns'

interface VehicleTableProps {
  vehicles: Vehicle[]
  onRefresh?: () => void
}

const STATUS_FILTERS = ['all', 'available', 'reserved', 'sold'] as const

export function VehicleTable({ vehicles, onRefresh }: VehicleTableProps) {
  const queryClient = useQueryClient()
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: VehicleStatus }) => {
      const res = await updateVehicle(id, { status })
      if (res.error) throw res.error
      return res.data
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: vehicleQueries.all })
      toast.success(`Vehicle status changed to ${vars.status}`)
      if (onRefresh) onRefresh()
    },
    onError: (err: any) => {
      toast.error('Failed to update status', { description: err.message })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteVehicle(id)
      if (res.error) throw res.error
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleQueries.all })
      toast.success('Vehicle removed from inventory')
      if (onRefresh) onRefresh()
    },
    onError: (err: any) => {
      toast.error('Failed to delete vehicle', { description: err.message })
    },
  })

  const counts = useMemo(() => ({
    all: vehicles.length,
    available: vehicles.filter((v) => v.status === 'available').length,
    reserved: vehicles.filter((v) => v.status === 'reserved').length,
    sold: vehicles.filter((v) => v.status === 'sold').length,
  }), [vehicles])

  const filteredVehicles = useMemo(() => {
    let result = vehicles
    if (statusFilter !== 'all') {
      result = result.filter((v) => v.status === statusFilter)
    }
    return result
  }, [vehicles, statusFilter])

  const columns = useMemo(
    () =>
      getVehicleColumns({
        onStatusChange: (id, status) =>
          updateStatusMutation.mutate({ id, status }),
        onDelete: (id, title) => {
          if (confirm(`Delete "${title}"?`)) deleteMutation.mutate(id)
        },
        isStatusUpdating: updateStatusMutation.isPending,
        isDeleting: deleteMutation.isPending,
      }),
    [updateStatusMutation, deleteMutation]
  )

  const table = useReactTable({
    data: filteredVehicles,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-3.5">
      {/* Search & Status Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  statusFilter === tab
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search by title, make, model..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8.5 h-8.5 text-xs rounded-xl bg-card border-border/60"
          />
        </div>
      </div>

      {/* Main Single Card Container */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-xs">
        {rows.length === 0 ? (
          <div className="p-8 text-center">
            <EmptyState
              icon={Car}
              title={
                globalFilter
                  ? `No vehicles match "${globalFilter}"`
                  : `No ${statusFilter !== 'all' ? statusFilter : ''} Vehicles Found`
              }
              description={
                globalFilter
                  ? 'Try clearing your search query or searching by another make or model.'
                  : 'No vehicle listings in this category.'
              }
              action={
                globalFilter
                  ? {
                      label: 'Clear Search',
                      onClick: () => setGlobalFilter(''),
                      variant: 'outline',
                    }
                  : {
                      label: 'Add First Vehicle',
                      href: '/admin/vehicles/new',
                      icon: Plus,
                    }
              }
              compact
            />
          </div>
        ) : (
          <>
            {/* Mobile View: Clean Card List */}
            <div className="md:hidden divide-y divide-border/40">
              {rows.map((row) => (
                <VehicleMobileCard
                  key={row.id}
                  vehicle={row.original}
                  onStatusChange={(id, status) =>
                    updateStatusMutation.mutate({ id, status })
                  }
                  onDelete={(id, title) => {
                    if (confirm(`Delete "${title}"?`)) deleteMutation.mutate(id)
                  }}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
            </div>

            {/* Desktop View: Full Tabular Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-muted/40 text-xs font-semibold">
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className="hover:bg-transparent">
                      {hg.headers.map((h) => (
                        <TableHead key={h.id} className="py-2.5 px-3 text-xs">
                          {flexRender(h.column.columnDef.header, h.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/20">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2.5 px-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
