import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

export interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

// In Next.js environments, use: import Image from "next/image"
// In Vite / standard React environments, we provide this lightweight compatible Image component:
function Image({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number | string
  height?: number | string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      {...props}
    />
  )
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!features || features.length === 0) return

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features, autoPlayInterval])

  if (!features || features.length === 0) {
    return null
  }

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center tracking-tight">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="order-2 md:order-1 space-y-6 md:space-y-8 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-center gap-6 md:gap-8 cursor-pointer rounded-2xl p-3 transition-colors",
                  index === currentFeature ? "bg-muted/40" : "hover:bg-muted/20"
                )}
                onClick={() => {
                  setCurrentFeature(index)
                  setProgress(0)
                }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={cn(
                    "w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center border-2 shrink-0 transition-all",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground scale-110 shadow-sm"
                      : "bg-muted border-muted-foreground/40 text-muted-foreground"
                  )}
                >
                  {index <= currentFeature ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span className="text-sm md:text-base font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-0.5">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative w-full h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-md",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ y: 80, opacity: 0, rotateX: -15 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -80, opacity: 0, rotateX: 15 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform transform duration-500 hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase bg-white text-zinc-900 rounded-full shadow-xs mb-1">
                          {feature.step}
                        </span>
                        <h4 className="text-lg font-bold text-white drop-shadow-sm">
                          {feature.title || feature.step}
                        </h4>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSteps
