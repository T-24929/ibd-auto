import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { vehicleQueries } from '../api/vehicles.queries'
import { INITIAL_VEHICLES } from '../data/vehicles.data'
import type { Vehicle } from '@/types/database.types'

export type SimilarityFilterMode = 'curated' | 'category' | 'budget' | 'brand'

export interface ScoredVehicle {
  vehicle: Vehicle
  score: number
  matchReason: string
  isSameCategory: boolean
  isSimilarBudget: boolean
  isSameMake: boolean
}

export function useSimilarVehicles(currentVehicle: Vehicle, filterMode: SimilarityFilterMode = 'curated') {
  const { data: allVehicles = [], isLoading } = useQuery(vehicleQueries.list())

  const vehiclesPool = allVehicles.length > 0 ? allVehicles : INITIAL_VEHICLES

  const otherVehicles = useMemo(() => {
    return vehiclesPool.filter((v) => v.id !== currentVehicle.id)
  }, [vehiclesPool, currentVehicle.id])

  const scoredVehicles = useMemo<ScoredVehicle[]>(() => {
    if (otherVehicles.length === 0) return []

    return otherVehicles.map((v) => {
      let score = 0
      let matchReason = 'Showroom Pick'

      const isSameCategory = v.body_type.toLowerCase() === currentVehicle.body_type.toLowerCase()
      const isSameMake = v.make.toLowerCase() === currentVehicle.make.toLowerCase()
      const isSameFuel = v.fuel_type.toLowerCase() === currentVehicle.fuel_type.toLowerCase()

      const priceRatio = currentVehicle.price > 0 ? v.price / currentVehicle.price : 1
      const isSimilarBudget = priceRatio >= 0.7 && priceRatio <= 1.35

      if (isSameCategory) {
        score += 4
        matchReason = `Alternative ${v.body_type}`
      }
      if (isSimilarBudget) {
        score += 3
        if (!isSameCategory) matchReason = 'Similar Price Tier'
      }
      if (isSameMake) {
        score += 3
        matchReason = `More by ${v.make}`
      }
      if (isSameFuel) score += 2
      if (v.transmission.toLowerCase() === currentVehicle.transmission.toLowerCase()) score += 1

      return {
        vehicle: v,
        score,
        matchReason,
        isSameCategory,
        isSimilarBudget,
        isSameMake,
      }
    })
  }, [otherVehicles, currentVehicle])

  const filteredVehicles = useMemo(() => {
    if (filterMode === 'category') {
      const match = scoredVehicles.filter((s) => s.isSameCategory)
      if (match.length > 0) return match.map((s) => s.vehicle)
    }

    if (filterMode === 'budget') {
      const match = scoredVehicles.filter((s) => s.isSimilarBudget)
      if (match.length > 0) return match.map((s) => s.vehicle)
    }

    if (filterMode === 'brand') {
      const match = scoredVehicles.filter((s) => s.isSameMake)
      if (match.length > 0) return match.map((s) => s.vehicle)
    }

    return [...scoredVehicles].sort((a, b) => b.score - a.score).map((s) => s.vehicle)
  }, [scoredVehicles, filterMode])

  const topScored = useMemo(() => {
    return [...scoredVehicles].sort((a, b) => b.score - a.score)
  }, [scoredVehicles])

  return {
    allSimilar: filteredVehicles,
    topScored,
    isLoading,
    totalCount: otherVehicles.length,
  }
}
