import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export function useHeroSearchParams() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const [make, setMake] = useState('Any Make')
  const [model, setModel] = useState('')
  const [bodyType, setBodyType] = useState('all')
  const [condition, setCondition] = useState('Any Condition')
  const [city, setCity] = useState('All Cities')
  const [fuel, setFuel] = useState('Any Fuel')
  const [gear, setGear] = useState('Any Gear')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    const searchObj: Record<string, any> = {}

    if (make !== 'Any Make') searchObj.make = make
    if (model.trim()) searchObj.model = model.trim()
    if (bodyType !== 'all') searchObj.bodyType = bodyType
    if (condition !== 'Any Condition') searchObj.condition = condition
    if (city !== 'All Cities') searchObj.location = city
    if (fuel !== 'Any Fuel') searchObj.fuelType = fuel
    if (gear !== 'Any Gear') searchObj.transmission = gear
    if (minYear) searchObj.minYear = Number(minYear)
    if (maxYear) searchObj.maxYear = Number(maxYear)
    if (minPrice) searchObj.minPrice = Number(minPrice)
    if (maxPrice) searchObj.maxPrice = Number(maxPrice)

    navigate({
      to: '/vehicles',
      search: searchObj,
    })
  }

  const handleReset = () => {
    setMake('Any Make')
    setModel('')
    setBodyType('all')
    setCondition('Any Condition')
    setCity('All Cities')
    setFuel('Any Fuel')
    setGear('Any Gear')
    setMinYear('')
    setMaxYear('')
    setMinPrice('')
    setMaxPrice('')
    setStep(1)
  }

  const hasActiveFilters = Boolean(
    make !== 'Any Make' ||
      model.trim() ||
      bodyType !== 'all' ||
      condition !== 'Any Condition' ||
      city !== 'All Cities' ||
      fuel !== 'Any Fuel' ||
      gear !== 'Any Gear' ||
      minPrice ||
      maxPrice ||
      minYear ||
      maxYear
  )

  return {
    step,
    setStep,
    make,
    setMake,
    model,
    setModel,
    bodyType,
    setBodyType,
    condition,
    setCondition,
    city,
    setCity,
    fuel,
    setFuel,
    gear,
    setGear,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleSearch,
    handleReset,
    hasActiveFilters,
  }
}
