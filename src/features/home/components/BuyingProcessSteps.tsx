import { FeatureSteps, type Feature } from "@/components/ui/feature-section"

const buyingProcessSteps: Feature[] = [
  {
    step: "Step 01",
    title: "Book your test drive",
    content: "Pick a time online in seconds. We wash the car and hoist it up so you and your mechanic can inspect every angle.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "Step 02",
    title: "Inspect on our hoist",
    content: "Review our 150-point diagnostic scan, check undercarriage health, and verify mileage logs with zero sales pressure.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "Step 03",
    title: "Clear, upfront price",
    content: "No hidden dealer fees, documentation markups, or surprise costs. The price on our website is your exact drive-away total.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "Step 04",
    title: "DMT transfer & drive home",
    content: "We complete government MTA 6 and MTA 8 title transfer forms, hand over both factory keys, and register the car to you.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
  },
]

export function BuyingProcessSteps() {
  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
      <FeatureSteps
        features={buyingProcessSteps}
        title="How Buying Works"
        autoPlayInterval={4500}
        imageHeight="h-[360px] md:h-[420px]"
        className="p-6 sm:p-10"
      />
    </section>
  )
}
