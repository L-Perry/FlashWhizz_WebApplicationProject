import React, { useState, KeyboardEvent } from "react"
import { ToggleLeft, ToggleRight } from "lucide-react"

type PrivateToggleProps = {
  variant?: "left" | "right"
  onChange?: (isPrivate: boolean) => void
}

export default function PrivateToggle({ variant = "left", onChange }: PrivateToggleProps) {
  const [isPrivate, setIsPrivate] = useState(variant === "left")
  const ToggleIcon = isPrivate ? ToggleLeft : ToggleRight

  function toggle() {
    setIsPrivate((prev) => {
      const next = !prev
      onChange?.(next)
      return next
    })
  }

  function handleKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPrivate}
      onClick={toggle}
      onKeyDown={handleKey}
      className="jersey-25-regular text-xl flex w-fit items-center gap-2 bg-transparent cursor-pointer select-none"
    >
      <span className={"font-medium " + (isPrivate ? "" : "opacity-50")}>Private</span>
      <ToggleIcon className="h-14 w-14" aria-hidden />
      <span className={"font-medium " + (isPrivate ? "opacity-50" : "")}>
        Public
      </span>
    </button>
  )
}
