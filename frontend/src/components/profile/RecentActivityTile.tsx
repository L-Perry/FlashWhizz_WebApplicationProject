import * as React from "react"
import { Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { RecentActivityBadge } from "./RecentActivityBadge"

type BadgeVariant = "flashcards" | "asteroids" | "matching"

type RecentActivityTileProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  badge?: BadgeVariant
  className?: string
  activityId?: string
  onDelete?: (activityId: string) => void
}

export default function RecentActivityTile({
  title,
  subtitle,
  badge,
  className,
  activityId,
  onDelete,
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

      {activityId && onDelete ? (
        <button
          type="button"
          aria-label="Delete activity"
          onClick={() => onDelete(activityId)}
          className="flex-shrink-0 text-red-600 hover:text-red-700 cursor-pointer bg-transparent p-1"
        >
          <Trash2 className="h-5 w-5" aria-hidden />
        </button>
      ) : null}
    </div>
  )
}
