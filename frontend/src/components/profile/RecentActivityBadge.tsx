import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "flashcards" | "asteroids" | "matching"

const VARIANT_MAP: Record<BadgeVariant, { text: string; classes: string }> = {
  flashcards: { text: "Flash Cards", classes: "bg-yellow-300 text-black" },
  asteroids: { text: "Asteroids", classes: "bg-teal-300 text-black" },
  matching: { text: "Matching", classes: "bg-orange-400 text-black" },
}

export function RecentActivityBadge({
  variant = "flashcards",
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

export default RecentActivityBadge
