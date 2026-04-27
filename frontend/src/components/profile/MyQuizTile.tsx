import * as React from "react"
import { cn } from "@/lib/utils"
import { MyQuizTileProgressBadge } from "./MyQuizTileProgressBadge"
import PrivateToggle from "./PrivateToggle"

type BadgeVariant = "mastered" | "good" | "practice" | "suck"

type MyQuizTileProps = {
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  badge?: BadgeVariant
  className?: string
  quizId?: string
  isPrivate?: boolean
  onPrivacyChange?: (next: boolean) => void
}

export default function MyQuizTile({
  icon,
  title,
  subtitle,
  badge,
  className,
  quizId,
  isPrivate,
  onPrivacyChange,
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

      {quizId !== undefined && isPrivate !== undefined ? (
        <PrivateToggle
          size="sm"
          value={isPrivate}
          onChange={(next) => onPrivacyChange?.(next)}
        />
      ) : null}

      {badge ? <MyQuizTileProgressBadge variant={badge} /> : null}
    </div>
  )
}
