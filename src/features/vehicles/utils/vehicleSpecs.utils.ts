import {
  Calendar,
  Gauge,
  Fuel,
  Cog,
  ShieldCheck,
  Paintbrush,
  Users,
  Zap,
  MapPin,
  FileCheck,
  Award,
} from 'lucide-react'
import { formatKM } from '@/lib/formatters'
import type { Vehicle } from '@/types/database.types'
import type { SpecItem } from '../components/SpecTile'

export function getPowertrainSpecs(vehicle: Vehicle): SpecItem[] {
  return [
    { label: 'Model Year', value: vehicle.year.toString(), icon: Calendar },
    {
      label: 'Verified Mileage',
      value: formatKM(vehicle.mileage),
      icon: Gauge,
    },
    {
      label: 'Engine Capacity',
      value: vehicle.engine_capacity || '1,000 cc',
      icon: Zap,
    },
    { label: 'Transmission', value: vehicle.transmission, icon: Cog },
    { label: 'Fuel Type', value: vehicle.fuel_type, icon: Fuel },
    { label: 'Body Style', value: vehicle.body_type, icon: Award },
  ]
}

export function getTitleAndHistorySpecs(vehicle: Vehicle): SpecItem[] {
  return [
    {
      label: 'Registration / VIN',
      value: vehicle.reg_number || 'Registered (Clean Title)',
      icon: FileCheck,
    },
    {
      label: 'Trim / Grade',
      value: vehicle.grade || 'Standard / Factory Trim',
      icon: Award,
    },
    {
      label: 'Previous Ownership',
      value: vehicle.owners || '1st Owner',
      icon: Users,
    },
    {
      label: 'DMT Clearance',
      value: 'Clear Title (RMV Verified)',
      icon: ShieldCheck,
    },
    { label: 'Exterior Color', value: vehicle.color, icon: Paintbrush },
    {
      label: 'Showroom Location',
      value: vehicle.location || 'Colombo Main Showroom',
      icon: MapPin,
    },
  ]
}

export function getFuelShade(fuel: string) {
  const f = fuel.toLowerCase()
  if (f.includes('hybrid')) {
    return 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25'
  }
  if (f.includes('electric')) {
    return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25'
  }
  return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25'
}
