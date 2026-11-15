import type { Vehicle } from '@/types/database.types'
import { TOYOTA_VEHICLES } from './vehicles.toyota.data'
import { HONDA_NISSAN_VEHICLES } from './vehicles.honda-nissan.data'
import { EUROPEAN_VEHICLES } from './vehicles.european.data'
import { ECO_PREMIUM_VEHICLES } from './vehicles.eco-premium.data'

export const INITIAL_VEHICLES: Vehicle[] = [
  ...TOYOTA_VEHICLES,
  ...HONDA_NISSAN_VEHICLES,
  ...EUROPEAN_VEHICLES,
  ...ECO_PREMIUM_VEHICLES,
]

export {
  TOYOTA_VEHICLES,
  HONDA_NISSAN_VEHICLES,
  EUROPEAN_VEHICLES,
  ECO_PREMIUM_VEHICLES,
}
