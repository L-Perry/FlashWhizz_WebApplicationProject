import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "mastered" | "good" | "practice" | "suck"

const VARIANT_MAP: Record<BadgeVariant, { text: string; classes: string }> = {
  mastered: { text: "Mastered", classes: "bg-emerald-600 text-white" },
  good: { text: "Good Progress", classes: "bg-lime-300 text-black" },
  practice: { text: "Needs Practice", classes: "bg-orange-400 text-black" },
  suck: { text: "You Suck", classes: "bg-red-600 text-white" },
}

export function MyQuizTileProgressBadge({
  variant = "mastered",
  className,
}: {
  variant?: BadgeVariant
  className?: string
}) {
  const cfg = VARIANT_MAP[variant]

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center justify-center gap-1 overflow-hidden rounded-4xl px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        cfg.classes,
        className
      )}
    >
      {cfg.text}
    </span>
  )
}

export default MyQuizTileProgressBadge
