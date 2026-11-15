import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { vehicleQueries } from '../api/vehicles.queries'
import { DEFAULT_FILTERS, type VehicleFiltersState } from '../types/vehicle.types'

export function useVehicles(initialFilters: Partial<VehicleFiltersState> = {}) {
  // Initialize filters from query params if present, else initialFilters, else default
  const [filters, setFilters] = useState<VehicleFiltersState>(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
    return {
      ...DEFAULT_FILTERS,
      ...initialFilters,
      search: params.get('search') || initialFilters.search || DEFAULT_FILTERS.search,
      make: params.get('make') || initialFilters.make || DEFAULT_FILTERS.make,
      model: params.get('model') || initialFilters.model || DEFAULT_FILTERS.model,
      bodyType: params.get('bodyType') || initialFilters.bodyType || DEFAULT_FILTERS.bodyType,
      category: params.get('category') || initialFilters.category || DEFAULT_FILTERS.category,
      condition: params.get('condition') || initialFilters.condition || DEFAULT_FILTERS.condition,
      location: params.get('location') || params.get('city') || initialFilters.location || DEFAULT_FILTERS.location,
      fuelType: params.get('fuelType') || initialFilters.fuelType || DEFAULT_FILTERS.fuelType,
      transmission: params.get('transmission') || initialFilters.transmission || DEFAULT_FILTERS.transmission,
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : (initialFilters.minPrice ?? DEFAULT_FILTERS.minPrice),
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : (initialFilters.maxPrice ?? DEFAULT_FILTERS.maxPrice),
      minYear: params.get('minYear') ? Number(params.get('minYear')) : (initialFilters.minYear ?? DEFAULT_FILTERS.minYear),
      maxYear: params.get('maxYear') ? Number(params.get('maxYear')) : (initialFilters.maxYear ?? DEFAULT_FILTERS.maxYear),
      maxMileage: params.get('maxMileage') ? Number(params.get('maxMileage')) : (initialFilters.maxMileage ?? DEFAULT_FILTERS.maxMileage),
      sortBy: (params.get('sortBy') as any) || initialFilters.sortBy || DEFAULT_FILTERS.sortBy,
    }
  })

  // TanStack Query v5 for server state caching (NO useEffect)
  const {
    data: allVehicles = [],
    isLoading,
    error,
    refetch,
  } = useQuery(vehicleQueries.list())

  const updateFilters = useCallback((newFilters: Partial<VehicleFiltersState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters }
      const params = new URLSearchParams()
      if (updated.search) params.set('search', updated.search)
      if (updated.make && updated.make !== 'all') params.set('make', updated.make)
      if (updated.model && updated.model !== 'all') params.set('model', updated.model)
      if (updated.category && updated.category !== 'all') params.set('category', updated.category)
      if (updated.bodyType && updated.bodyType !== 'all') params.set('bodyType', updated.bodyType)
      if (updated.condition && updated.condition !== 'all') params.set('condition', updated.condition)
      if (updated.location && updated.location !== 'all') params.set('location', updated.location)
      if (updated.fuelType && updated.fuelType !== 'all') params.set('fuelType', updated.fuelType)
      if (updated.transmission && updated.transmission !== 'all') params.set('transmission', updated.transmission)
      if (updated.minPrice > 0) params.set('minPrice', String(updated.minPrice))
      if (updated.maxPrice < 100000000) params.set('maxPrice', String(updated.maxPrice))
      if (updated.minYear > 2010) params.set('minYear', String(updated.minYear))
      if (updated.maxYear < new Date().getFullYear() + 1) params.set('maxYear', String(updated.maxYear))
      if (updated.maxMileage < 300000) params.set('maxMileage', String(updated.maxMileage))
      if (typeof window !== 'undefined') {
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
        window.history.replaceState(null, '', newUrl)
      }
      return updated
    })
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((v) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchesTitle = v.title.toLowerCase().includes(query)
        const matchesMake = v.make.toLowerCase().includes(query)
        const matchesModel = v.model.toLowerCase().includes(query)
        const matchesReg = (v.reg_number || '').toLowerCase().includes(query)
        const matchesLoc = (v.location || '').toLowerCase().includes(query)
        const matchesDesc = (v.description || '').toLowerCase().includes(query)
        if (!matchesTitle && !matchesMake && !matchesModel && !matchesReg && !matchesLoc && !matchesDesc) {
          return false
        }
      }

      if (filters.make !== 'all' && v.make.toLowerCase() !== filters.make.toLowerCase()) return false
      if (filters.model !== 'all' && filters.model) {
        const m = filters.model.toLowerCase()
        if (!v.model.toLowerCase().includes(m) && !v.title.toLowerCase().includes(m)) return false
      }
      if (filters.location !== 'all' && filters.location) {
        const loc = filters.location.toLowerCase()
        if (!v.location || !v.location.toLowerCase().includes(loc)) return false
      }
      if (filters.category !== 'all' && filters.category) {
        const cat = filters.category.toLowerCase()
        const b = v.body_type.toLowerCase()
        if (cat === 'cars' && !['sedan', 'hatchback', 'coupe', 'wagon'].includes(b)) return false
        if (cat === 'suvs' && !b.includes('suv')) return false
        if (cat === 'vans' && !b.includes('van')) return false
        if (cat === 'pickups' && !b.includes('truck') && !b.includes('pickup')) return false
      }
      if (filters.bodyType !== 'all' && v.body_type.toLowerCase() !== filters.bodyType.toLowerCase()) return false
      if (filters.condition !== 'all' && filters.condition) {
        if (!v.condition.toLowerCase().includes(filters.condition.toLowerCase())) return false
      }
      if (filters.fuelType !== 'all' && v.fuel_type.toLowerCase() !== filters.fuelType.toLowerCase()) return false
      if (filters.transmission !== 'all' && v.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false
      if (filters.status !== 'all' && v.status !== filters.status) return false
      if (v.price < filters.minPrice || v.price > filters.maxPrice) return false
      if (v.year < filters.minYear || v.year > filters.maxYear) return false
      if (filters.maxMileage && v.mileage > filters.maxMileage) return false

      return true
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price
      if (filters.sortBy === 'price-desc') return b.price - a.price
      if (filters.sortBy === 'year-desc') return b.year - a.year
      if (filters.sortBy === 'mileage-asc') return a.mileage - b.mileage
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }, [allVehicles, filters])

  return {
    vehicles: filteredVehicles,
    allVehicles,
    isLoading,
    error: error ? (error as Error).message : null,
    filters,
    updateFilters,
    resetFilters,
    reload: refetch,
  }
}
