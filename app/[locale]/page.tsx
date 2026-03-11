"use client"

import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-6">
      {/* Glass card */}
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-blue-400/20 bg-white/[0.04] px-14 py-12 shadow-2xl backdrop-blur-md">
        <Image
          src="/yom-logo.png"
          alt="YOM Logo"
          width={120}
          height={120}
          className="object-contain"
        />

        <div className="text-4xl font-bold tracking-wide text-blue-100/90">
          One For All
        </div>
      </div>

      <Link
        className="flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/20 px-8 py-3 text-sm font-semibold tracking-wider text-blue-200 backdrop-blur-sm transition-all duration-200 hover:border-blue-400/60 hover:bg-blue-500/30 hover:text-white"
        href="/local/chat"
      >
        Start Chatting
        <IconArrowRight size={16} />
      </Link>
    </div>
  )
}
