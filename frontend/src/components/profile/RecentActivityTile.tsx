import * as React from "react"

import { cn } from "@/lib/utils"
import { RecentActivityBadge } from "./RecentActivityBadge"

type BadgeVariant = "flashcards" | "asteroids" | "matching"

type RecentActivityTileProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  badge?: BadgeVariant
  className?: string
}

export default function RecentActivityTile({
  title,
  subtitle,
  badge,
  className,
}: RecentActivityTileProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-md bg-card py-3 px-4 text-sm text-card-foreground ring-1 ring-foreground/10 shadow-md",
        className
      )}
    >

      <div className="flex-1 flex flex-col">
        <div className="font-medium">{title}</div>
        {subtitle ? (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        ) : null}
      </div>

      {badge ? (
        <div className="flex-shrink-0">
          <RecentActivityBadge variant={badge} />
        </div>
      ) : null}
    </div>
  )
}
