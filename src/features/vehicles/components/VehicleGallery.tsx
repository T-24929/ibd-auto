import { LightboxGrid, type LightboxImage } from '@/components/kokonutui/lightbox-grid'

interface VehicleGalleryProps {
  id?: string
  images: string[]
  title: string
}

export function VehicleGallery({ id, images, title }: VehicleGalleryProps) {
  const rawImages =
    images && images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80']

  const lightboxImages: LightboxImage[] = rawImages.map((src, idx) => ({
    src,
    alt: `${title} - Photo ${idx + 1}`,
    width: 1600,
    height: 1067,
    caption: `${title} — Angle ${idx + 1}`,
  }))

  return (
    <div
      className="rounded-2xl md:rounded-3xl overflow-hidden border border-border/60 bg-card p-2 sm:p-3 shadow-md"
      style={id ? { viewTransitionName: `vehicle-image-${id}` } : undefined}
    >
      <LightboxGrid images={lightboxImages} className="w-full max-w-none" />
    </div>
  )
}
