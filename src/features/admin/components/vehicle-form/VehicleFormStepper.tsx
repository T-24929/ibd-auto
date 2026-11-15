import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import type { Vehicle } from '@/types/database.types'
import { createVehicle, updateVehicle } from '@/features/vehicles/api/vehicles.api'
import { vehicleQueries } from '@/features/vehicles/api/vehicles.queries'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Save } from 'lucide-react'

import { type VehicleFormData, DEFAULT_VEHICLE_FORM, buildVehiclePayload } from '../../types/adminForm.types'
import { VehicleStepperHeader } from './VehicleStepperHeader'
import { VehicleFormStepIdentity } from './VehicleFormStepIdentity'
import { VehicleFormStepValuation } from './VehicleFormStepValuation'
import { VehicleFormStepMedia } from './VehicleFormStepMedia'
import { VehicleFormStepReview } from './VehicleFormStepReview'
import { VehicleFormLivePreview } from './VehicleFormLivePreview'

interface StepperProps {
  initialVehicle?: Vehicle
  isEditing?: boolean
}

export function VehicleFormStepper({ initialVehicle, isEditing = false }: StepperProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<VehicleFormData>(() => {
    if (!initialVehicle) return DEFAULT_VEHICLE_FORM
    return {
      title: initialVehicle.title || '',
      make: initialVehicle.make || '',
      model: initialVehicle.model || '',
      year: initialVehicle.year || 2021,
      price: initialVehicle.price || 12500000,
      mileage: initialVehicle.mileage || 25000,
      fuel_type: String(initialVehicle.fuel_type || 'Hybrid'),
      transmission: String(initialVehicle.transmission || 'Automatic'),
      body_type: String(initialVehicle.body_type || 'SUV'),
      color: initialVehicle.color || 'Pearl White',
      condition: String(initialVehicle.condition || 'Excellent'),
      status: initialVehicle.status || 'available',
      location: initialVehicle.location || 'Colombo Main Showroom',
      engine_capacity: initialVehicle.engine_capacity || '2,000 cc',
      reg_number: initialVehicle.reg_number || '',
      grade: initialVehicle.grade || '',
      owners: initialVehicle.owners || '1st Owner',
      service_history: initialVehicle.service_history || '',
      doors: initialVehicle.doors || 5,
      seats: initialVehicle.seats || 5,
      featured: initialVehicle.featured || false,
      images: initialVehicle.images || DEFAULT_VEHICLE_FORM.images,
      description: initialVehicle.description || '',
      features: initialVehicle.features || DEFAULT_VEHICLE_FORM.features,
    }
  })

  const updateFormData = (patch: Partial<VehicleFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.make.trim() || !formData.model.trim()) {
        toast.error('Make and Model are required.')
        return false
      }
    }
    if (step === 2) {
      if (!formData.price || formData.price <= 0) {
        toast.error('Please enter a valid selling price.')
        return false
      }
    }
    if (step === 3) {
      if (formData.images.length === 0) {
        toast.error('Please configure at least one vehicle image.')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) return
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const handleSubmit = async () => {
    if (!formData.make || !formData.model || !formData.price) {
      toast.error('Required fields are missing.')
      return
    }

    setIsSubmitting(true)
    const payload = buildVehiclePayload(formData)

    const { error } = isEditing && initialVehicle
      ? await updateVehicle(initialVehicle.id, payload)
      : await createVehicle(payload)

    setIsSubmitting(false)
    if (error) {
      toast.error(isEditing ? 'Failed to update listing' : 'Failed to add vehicle', { description: error.message })
    } else {
      queryClient.invalidateQueries({ queryKey: vehicleQueries.all })
      toast.success(isEditing ? 'Vehicle listing updated successfully!' : 'Vehicle published to showroom inventory!')
      navigate({ to: '/admin/vehicles' })
    }
  }

  return (
    <div className="space-y-6">
      <VehicleStepperHeader
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
        completedSteps={completedSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          <Card className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-border/80 bg-card/90 shadow-xs">
            {currentStep === 1 && <VehicleFormStepIdentity data={formData} onChange={updateFormData} />}
            {currentStep === 2 && <VehicleFormStepValuation data={formData} onChange={updateFormData} />}
            {currentStep === 3 && <VehicleFormStepMedia data={formData} onChange={updateFormData} />}
            {currentStep === 4 && (
              <VehicleFormStepReview
                data={formData}
                onChange={updateFormData}
                onJumpToStep={(s) => setCurrentStep(s)}
              />
            )}
          </Card>

          <div className="flex items-center justify-between gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
              className="rounded-xl h-10 px-5 gap-2 font-semibold text-xs cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Previous Step</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="rounded-xl h-10 px-6 gap-2 font-semibold text-xs shadow-md shadow-primary/20 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="size-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-xl h-10 px-7 gap-2 font-semibold text-xs bg-primary text-primary-foreground shadow-lg shadow-primary/30 cursor-pointer"
              >
                <Save className="size-3.5" />
                <span>{isEditing ? 'Save Changes' : 'Publish to Showroom'}</span>
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <VehicleFormLivePreview data={formData} currentStep={currentStep} />
        </div>
      </div>
    </div>
  )
}
