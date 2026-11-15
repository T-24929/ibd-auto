import { useState } from 'react'
import type { Vehicle } from '@/types/database.types'
import { motion, AnimatePresence } from 'framer-motion'
import { SpecTile } from './SpecTile'
import {
  getPowertrainSpecs,
  getTitleAndHistorySpecs,
} from '../utils/vehicleSpecs.utils'
import { ShieldCheck, Zap, FileCheck, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VehicleSpecsProps {
  vehicle: Vehicle
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const [activeTab, setActiveTab] = useState<'powertrain' | 'history'>('powertrain')

  const powertrainSpecs = getPowertrainSpecs(vehicle)
  const titleAndHistorySpecs = getTitleAndHistorySpecs(vehicle)

  const tabs = [
    {
      id: 'powertrain' as const,
      title: 'Engine & Drive',
      icon: Zap,
    },
    {
      id: 'history' as const,
      title: 'Title & Records',
      icon: FileCheck,
    },
  ]

  return (
    <div className="space-y-3.5 pt-2">
      {/* Clean Section Header */}
      <div className="flex items-center justify-between gap-2 pb-0.5">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" />
          <span>Technical Specifications</span>
        </h3>
      </div>

      {/* Pill Tab Switcher */}
      <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-muted/70 border border-border/70 shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-xs sm:text-sm cursor-pointer select-none transition-colors duration-150',
                isActive
                  ? 'text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="vehicleSpecsActiveTab"
                  className="absolute inset-0 rounded-xl bg-primary shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="size-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.title}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Specifications Card */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm">
        <AnimatePresence mode="wait">
          {activeTab === 'powertrain' && (
            <motion.div
              key="powertrain"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {powertrainSpecs.map((item, i) => (
                  <SpecTile
                    key={i}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/30">
                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  OBD diagnostics, compression levels, and transmission checked
                  on hoist.
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {titleAndHistorySpecs.map((item, i) => (
                  <SpecTile
                    key={i}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/30">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  DMT & RMV Clear Title Verified • Hoist Inspection Report on File
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
