import type { LucideIcon } from "lucide-react"
import { Boxes, Code2, Rocket, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HowItWorksStep {
  icon: LucideIcon
  title: string
  body: string
  tag?: string
  image?: string
}

export const defaultSteps: HowItWorksStep[] = [
  {
    icon: Boxes,
    title: "Browse the catalog",
    body: "135 production sections across nine categories. Search, filter, preview — pick the block that matches the page you're writing.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Code2,
    title: "Install via shadcn",
    body: "One command pulls the source into your project. Theme tokens, shadcn primitives and Tailwind utilities — nothing exotic.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: ShieldCheck,
    title: "Customize without fear",
    body: "Every block is a single .tsx file you own. Rename, restyle, refactor — the registry won't fight you on the next pull.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Rocket,
    title: "Ship",
    body: "Drop your copy, your logo and your CTAs in. Light + dark are already wired. Push to production.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
]

export interface HowItWorks02Props {
  steps?: HowItWorksStep[]
  badge?: string
  title?: string
  description?: string
  className?: string
  compact?: boolean
}

export function HowItWorks02({
  steps = defaultSteps,
  badge = "How it works",
  title = "A four-step path from blank page to launched site",
  description,
  className,
  compact = false,
}: HowItWorks02Props) {
  return (
    <section className={cn("bg-background", compact ? "py-6 sm:py-8" : "py-14 sm:py-20", className)}>
      <div className={cn("mx-auto", compact ? "max-w-none px-0" : "max-w-3xl px-6 sm:px-10")}>
        <div className={cn("flex flex-col gap-2.5", compact ? "text-left" : "text-center")}>
          {badge && (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {badge}
            </span>
          )}
          <h2
            className="text-balance font-semibold tracking-tight text-foreground"
            style={{
              fontSize: compact ? "clamp(1.25rem, 2.5vw, 1.75rem)" : "clamp(1.85rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>

        <ol
          className={cn(
            "relative flex flex-col border-l border-dashed border-border/80",
            compact ? "mt-8 gap-4 pl-9 sm:pl-11" : "mt-12 sm:mt-14 flex-col gap-6 pl-10 sm:pl-12"
          )}
        >
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="relative">
                <span
                  className={cn(
                    "absolute top-1.5 grid place-items-center rounded-full border border-border bg-card font-mono font-semibold text-foreground shadow-xs shadow-black/5",
                    compact
                      ? "-left-[3.25rem] size-8 text-[11px] sm:-left-[3.75rem]"
                      : "-left-[3.65rem] size-9 text-xs sm:-left-[4.15rem]"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 transition-all duration-200 hover:border-border hover:bg-muted/20 hover:shadow-xs">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>

                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm sm:text-base tracking-tight text-foreground">
                        {s.title}
                      </h3>
                      {s.tag && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted border border-border/60 text-muted-foreground shrink-0">
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {s.body}
                    </p>
                    {s.image && (
                      <div className="mt-2 h-32 sm:h-40 w-full overflow-hidden rounded-xl border border-border/50">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks02
