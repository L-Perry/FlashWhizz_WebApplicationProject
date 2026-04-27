import * as React from "react"
import { cn } from "@/lib/utils"

type QuizTileProps = {
    title: React.ReactNode
    subtitle?: React.ReactNode
    questionCount?: number
    className?: string
    onClick?: () => void
}

export default function QuizTile({
    title,
    subtitle,
    questionCount,
    className,
    onClick,
}: QuizTileProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-3 rounded-md bg-card py-3 px-4 text-sm text-card-foreground ring-1 ring-foreground/10 shadow-md cursor-pointer hover:bg-muted/40 transition",
                className
            )}
        >
            <div className="flex-1 flex flex-col">
                <div className="font-medium">{title}</div>

                {subtitle ? (
                    <div className="text-xs text-muted-foreground">
                        {subtitle}
                    </div>
                ) : null}
            </div>

            {typeof questionCount === "number" && (
                <div className="flex-shrink-0 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {questionCount} Qs
                </div>
            )}
        </div>
    )
}