import React from "react"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

export interface SlideTextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  hoverText?: string
  href?: string
  className?: string
  variant?: "default" | "ghost" | "primary"
  /** Fades and slides the button in when it mounts. */
  animateIn?: boolean
  icon?: React.ReactNode
}

export function SlideTextButton({
  text = "Book Inspection",
  hoverText,
  href,
  className,
  variant = "primary",
  animateIn = true,
  icon,
  onClick,
  ...props
}: SlideTextButtonProps) {
  const slideText = hoverText ?? text

  const variantStyles =
    variant === "ghost"
      ? "border border-border text-foreground hover:bg-muted/60"
      : variant === "default"
      ? "bg-foreground text-background hover:bg-foreground/90 shadow-md"
      : "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/25"

  const content = (
    <>
      {icon && <span className="mr-2 shrink-0">{icon}</span>}
      <span className="grid justify-items-center transition-transform duration-200 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
        <span className="col-start-1 row-start-1 flex items-center gap-2 opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
          <span className="font-semibold">{text}</span>
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 flex translate-y-full items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="font-semibold">{slideText}</span>
        </span>
      </span>
    </>
  )

  const commonClasses = cn(
    "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl px-6 font-medium text-sm tracking-tight transition-[background-color,scale,opacity,translate] duration-[150ms,150ms,200ms,200ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 active:scale-[0.98] motion-reduce:active:scale-100 cursor-pointer",
    animateIn &&
      "starting:translate-x-2 starting:opacity-0 motion-reduce:starting:translate-x-0",
    variantStyles,
    className
  )

  if (href) {
    return (
      <Link to={href} className={commonClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={commonClasses}
      {...props}
    >
      {content}
    </button>
  )
}

export default SlideTextButton
