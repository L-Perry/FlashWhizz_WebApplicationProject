import React, { useState, KeyboardEvent } from "react"
import { ToggleLeft, ToggleRight } from "lucide-react"

type PrivateToggleProps = {
  variant?: "left" | "right"
  value?: boolean
  onChange?: (isPrivate: boolean) => void
  size?: "sm" | "md"
}

export default function PrivateToggle({ variant = "left", value, onChange, size = "md" }: PrivateToggleProps) {
  const [internal, setInternal] = useState(variant === "left")
  const isPrivate = value ?? internal
  const ToggleIcon = isPrivate ? ToggleLeft : ToggleRight

  function toggle() {
    const next = !isPrivate
    if (value === undefined) {
      setInternal(next)
    }
    onChange?.(next)
  }

  function handleKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault()
      toggle()
    }
  }

  const iconSize = size === "sm" ? "h-7 w-7" : "h-14 w-14"
  const textSize = size === "sm" ? "text-sm" : "text-xl"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPrivate}
      onClick={toggle}
      onKeyDown={handleKey}
      className={`jersey-25-regular ${textSize} flex w-fit items-center gap-2 bg-transparent cursor-pointer select-none`}
    >
      <span className={"font-medium " + (isPrivate ? "" : "opacity-50")}>Private</span>
      <ToggleIcon className={iconSize} aria-hidden />
      <span className={"font-medium " + (isPrivate ? "opacity-50" : "")}>
        Public
      </span>
    </button>
  )
}
