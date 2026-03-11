"use client"

import { FC } from "react"
import Image from "next/image"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme: _theme = "dark" }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src="/yom-logo.png"
        alt="YOM Logo"
        width={110}
        height={110}
        className="object-contain"
      />
      <div className="text-3xl font-bold tracking-wide text-blue-100/90">
        One For All
      </div>
    </div>
  )
}
