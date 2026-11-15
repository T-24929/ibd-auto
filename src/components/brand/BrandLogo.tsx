import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  iconClassName?: string
  showText?: boolean
  subtitle?: string
  textClassName?: string
  variant?: 'auto' | 'black' | 'white'
  boxed?: boolean
}

/**
 * Geometric vector emblem for IBD Auto
 */
export function IBDMark({
  className,
  variant = 'auto',
}: {
  className?: string
  variant?: 'auto' | 'black' | 'white'
}) {
  const colorClass =
    variant === 'black'
      ? 'text-black'
      : variant === 'white'
        ? 'text-white'
        : 'text-foreground'

  return (
    <svg
      viewBox="315 285 450 515"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0 fill-current', colorClass, className)}
      aria-hidden="true"
    >
      <g transform="matrix(1,0,0,1,1.772367,-1.055153)">
        <path d="M322.429,658.763L322.429,415.653L369.359,390.265L369.359,691.845L322.429,658.763Z" />
      </g>
      <path d="M418.83,358.437L541.772,291.505L564.234,305.353L564.234,499.225C564.234,499.225 554.233,526.35 526.537,538.945C526.537,538.945 561.399,559.317 564.234,576.928C562.639,616.94 564.234,773.109 564.234,773.109L541.772,788.495L418.83,717.717L418.83,358.437ZM468.002,389.21L468.002,690.79L517.239,709.457L517.239,366.025L468.002,389.21Z" />
      <path d="M610.394,329.971L755.799,416.137L755.799,663.094L610.394,750.029C610.394,750.029 611.933,622.319 610.394,580.005C608.856,537.692 547.309,555.387 578.851,538.945C610.394,522.503 610.394,499.225 610.394,499.225L610.394,329.971ZM658.551,427.423L658.551,654.557L707.296,634.862L707.296,442.836L658.551,427.423Z" />
    </svg>
  )
}

export function BrandLogo({
  className,
  iconClassName,
  showText = true,
  subtitle,
  textClassName,
  variant = 'auto',
  boxed = false,
}: BrandLogoProps) {
  const textColor =
    variant === 'white'
      ? 'text-white'
      : variant === 'black'
        ? 'text-black'
        : 'text-foreground'

  const subtitleColor =
    variant === 'white'
      ? 'text-zinc-400'
      : 'text-muted-foreground'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {boxed ? (
        <div
          className={cn(
            'size-10 rounded-2xl flex items-center justify-center transition-all duration-300',
            variant === 'white'
              ? 'bg-white text-black shadow-md'
              : 'bg-primary text-primary-foreground shadow-md shadow-primary/20',
            iconClassName,
          )}
        >
          <IBDMark className="size-6 text-inherit" />
        </div>
      ) : (
        <IBDMark
          className={cn(
            'size-8 transition-transform duration-200 group-hover:scale-105',
            iconClassName,
          )}
          variant={variant}
        />
      )}

      {showText && (
        <div className={cn('flex flex-col', textClassName)}>
          <span
            className={cn(
              'font-semibold text-xl tracking-tight flex items-center gap-1.5 leading-none font-sans',
              textColor,
            )}
          >
            <span>IBD AUTO</span>
            <span className="font-semibold tracking-normal">LK</span>
          </span>
          {subtitle && (
            <span
              className={cn(
                'text-[10px] uppercase font-mono tracking-widest leading-none mt-1 font-medium',
                subtitleColor,
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
