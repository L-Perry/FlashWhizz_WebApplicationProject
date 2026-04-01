import { ToggleLeft, ToggleRight } from "lucide-react"

type PrivateToggleProps = {
  variant?: "left" | "right"
}

export default function PrivateToggle({ variant = "left" }: PrivateToggleProps) {
  const ToggleIcon = variant === "left" ? ToggleLeft : ToggleRight

  return (
    <div className="jersey-25-regular text-xl flex w-fit items-center gap-2 bg-transparent">
      <span className=" font-medium">Private</span>
      <ToggleIcon className="h-14 w-14" />
      <span className=" font-medium">Public</span>
    </div>
  )
}
