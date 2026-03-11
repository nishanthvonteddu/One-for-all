import { FC } from "react"

interface YomSVGProps {
  scale?: number
  className?: string
}

export const YomSVG: FC<YomSVGProps> = ({ scale = 1, className }) => {
  const w = 180 * scale
  const h = 210 * scale

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 180 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="yomBody"
          x1="10%"
          y1="0%"
          x2="90%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#8ec4dc" />
          <stop offset="45%" stopColor="#5a96b8" />
          <stop offset="100%" stopColor="#2e6080" />
        </linearGradient>

        <linearGradient
          id="yomHighlight"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#cce5f5" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#a0cce0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#78aec8" stopOpacity="0.1" />
        </linearGradient>

        <filter id="yomShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="2"
            dy="3"
            stdDeviation="5"
            floodColor="#071520"
            floodOpacity="0.65"
          />
        </filter>
      </defs>

      {/* ── Dark shadow base ─────────────────────────────── */}
      <g opacity="0.75" filter="url(#yomShadow)">
        {/* Left loop */}
        <path
          d="M 90,118 C 78,98 50,76 46,53 C 42,32 59,18 77,23 C 93,27 101,46 92,62 C 85,74 72,82 90,118"
          stroke="#1b3f5a"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right arm */}
        <path
          d="M 90,118 C 112,94 141,68 148,45 C 153,28 143,18 131,22"
          stroke="#1b3f5a"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bottom stem */}
        <path
          d="M 90,118 C 93,144 103,167 115,180 C 128,195 147,190 144,171 C 141,155 125,151 115,158"
          stroke="#1b3f5a"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── Main body ─────────────────────────────────────── */}
      <g>
        {/* Left loop */}
        <path
          d="M 90,118 C 78,98 50,76 46,53 C 42,32 59,18 77,23 C 93,27 101,46 92,62 C 85,74 72,82 90,118"
          stroke="url(#yomBody)"
          strokeWidth="19"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right arm */}
        <path
          d="M 90,118 C 112,94 141,68 148,45 C 153,28 143,18 131,22"
          stroke="url(#yomBody)"
          strokeWidth="19"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bottom stem */}
        <path
          d="M 90,118 C 93,144 103,167 115,180 C 128,195 147,190 144,171 C 141,155 125,151 115,158"
          stroke="url(#yomBody)"
          strokeWidth="19"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── Highlight (inner edge shimmer) ────────────────── */}
      <g opacity="0.6">
        {/* Left loop */}
        <path
          d="M 90,118 C 78,98 50,76 46,53 C 42,32 59,18 77,23 C 93,27 101,46 92,62 C 85,74 72,82 90,118"
          stroke="url(#yomHighlight)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right arm */}
        <path
          d="M 90,118 C 112,94 141,68 148,45 C 153,28 143,18 131,22"
          stroke="url(#yomHighlight)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bottom stem */}
        <path
          d="M 90,118 C 93,144 103,167 115,180 C 128,195 147,190 144,171 C 141,155 125,151 115,158"
          stroke="url(#yomHighlight)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
