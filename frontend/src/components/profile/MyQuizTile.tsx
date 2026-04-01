import * as React from "react"
import { cn } from "@/lib/utils"
import { MyQuizTileProgressBadge } from "./MyQuizTileProgressBadge"

type BadgeVariant = "mastered" | "good" | "practice" | "suck"

type MyQuizTileProps = {
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  badge?: BadgeVariant
  className?: string
}

export default function MyQuizTile({
  icon,
  title,
  subtitle,
  badge,
  className,
}: MyQuizTileProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-md bg-card py-3 px-4 text-sm text-card-foreground ring-1 ring-foreground/10 shadow-md",
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground">
        {icon}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="font-medium">{title}</div>
        {subtitle ? (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        ) : null}
      </div>

      {badge ? <MyQuizTileProgressBadge variant={badge} /> : null}
    </div>
  )
}
