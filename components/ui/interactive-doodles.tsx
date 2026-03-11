"use client"

import { useCallback, useState } from "react"

type DoodleType =
  | "circle"
  | "square"
  | "triangle"
  | "star"
  | "cross"
  | "diamond"
  | "arc"
  | "wave"
  | "hex"

interface DoodleDef {
  id: number
  type: DoodleType
  x: number // % from left
  y: number // % from top
  size: number // px
  rotation: number
  animName: "float1" | "float2" | "float3"
  animDuration: string
  animDelay: string
  color: string
}

interface RippleDef {
  id: number
  doodleId: number
  x: number
  y: number
}

const COLORS = ["#60a5fa", "#93c5fd", "#3b82f6", "#a5b4fc", "#67e8f9"]

const DOODLES: DoodleDef[] = [
  {
    id: 1,
    type: "circle",
    x: 6,
    y: 12,
    size: 48,
    rotation: 0,
    animName: "float1",
    animDuration: "6.4s",
    animDelay: "0s",
    color: COLORS[0]
  },
  {
    id: 2,
    type: "triangle",
    x: 87,
    y: 18,
    size: 38,
    rotation: 12,
    animName: "float2",
    animDuration: "7.2s",
    animDelay: "0.8s",
    color: COLORS[1]
  },
  {
    id: 3,
    type: "square",
    x: 93,
    y: 62,
    size: 34,
    rotation: 22,
    animName: "float3",
    animDuration: "8.1s",
    animDelay: "1.5s",
    color: COLORS[2]
  },
  {
    id: 4,
    type: "star",
    x: 5,
    y: 68,
    size: 36,
    rotation: 0,
    animName: "float1",
    animDuration: "9.0s",
    animDelay: "2.0s",
    color: COLORS[0]
  },
  {
    id: 5,
    type: "cross",
    x: 78,
    y: 86,
    size: 26,
    rotation: 45,
    animName: "float2",
    animDuration: "6.7s",
    animDelay: "0.3s",
    color: COLORS[3]
  },
  {
    id: 6,
    type: "diamond",
    x: 18,
    y: 88,
    size: 30,
    rotation: 0,
    animName: "float3",
    animDuration: "7.6s",
    animDelay: "1.2s",
    color: COLORS[0]
  },
  {
    id: 7,
    type: "arc",
    x: 48,
    y: 5,
    size: 54,
    rotation: 10,
    animName: "float1",
    animDuration: "8.8s",
    animDelay: "0.6s",
    color: COLORS[2]
  },
  {
    id: 8,
    type: "wave",
    x: 38,
    y: 93,
    size: 64,
    rotation: 0,
    animName: "float2",
    animDuration: "7.3s",
    animDelay: "1.8s",
    color: COLORS[1]
  },
  {
    id: 9,
    type: "circle",
    x: 13,
    y: 44,
    size: 22,
    rotation: 0,
    animName: "float3",
    animDuration: "5.8s",
    animDelay: "2.5s",
    color: COLORS[4]
  },
  {
    id: 10,
    type: "triangle",
    x: 67,
    y: 10,
    size: 28,
    rotation: -8,
    animName: "float1",
    animDuration: "6.9s",
    animDelay: "0.4s",
    color: COLORS[1]
  },
  {
    id: 11,
    type: "hex",
    x: 28,
    y: 4,
    size: 20,
    rotation: 0,
    animName: "float2",
    animDuration: "9.5s",
    animDelay: "1.6s",
    color: COLORS[2]
  },
  {
    id: 12,
    type: "star",
    x: 96,
    y: 38,
    size: 24,
    rotation: 18,
    animName: "float3",
    animDuration: "7.5s",
    animDelay: "0.9s",
    color: COLORS[0]
  },
  {
    id: 13,
    type: "square",
    x: 55,
    y: 96,
    size: 18,
    rotation: 35,
    animName: "float1",
    animDuration: "6.2s",
    animDelay: "2.2s",
    color: COLORS[3]
  },
  {
    id: 14,
    type: "arc",
    x: 3,
    y: 32,
    size: 40,
    rotation: -20,
    animName: "float2",
    animDuration: "8.3s",
    animDelay: "0.7s",
    color: COLORS[4]
  },
  {
    id: 15,
    type: "diamond",
    x: 72,
    y: 96,
    size: 22,
    rotation: 0,
    animName: "float3",
    animDuration: "7.0s",
    animDelay: "1.4s",
    color: COLORS[1]
  }
]

function renderShape(
  type: DoodleType,
  size: number,
  color: string,
  isHovered: boolean
) {
  const sw = Math.max(1.5, size * 0.065)
  const half = size / 2
  const opacity = isHovered ? 0.75 : 0.16
  const glowFilter = isHovered
    ? `drop-shadow(0 0 6px ${color}bb) drop-shadow(0 0 12px ${color}55)`
    : "none"
  const vb = `0 0 ${size} ${size}`

  switch (type) {
    case "circle":
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <circle
            cx={half}
            cy={half}
            r={half - sw}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
          />
        </svg>
      )

    case "square":
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <rect
            x={sw}
            y={sw}
            width={size - sw * 2}
            height={size - sw * 2}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            rx={3}
          />
        </svg>
      )

    case "triangle": {
      const pts = `${half},${sw} ${size - sw},${size - sw} ${sw},${size - sw}`
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <polygon
            points={pts}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinejoin="round"
          />
        </svg>
      )
    }

    case "star": {
      const R = half - sw
      const r = R * 0.42
      const pts = Array.from({ length: 10 }, (_, i) => {
        const angle = (i * Math.PI) / 5 - Math.PI / 2
        const rad = i % 2 === 0 ? R : r
        return `${half + rad * Math.cos(angle)},${half + rad * Math.sin(angle)}`
      }).join(" ")
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <polygon
            points={pts}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinejoin="round"
          />
        </svg>
      )
    }

    case "cross":
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <line
            x1={half}
            y1={sw}
            x2={half}
            y2={size - sw}
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinecap="round"
          />
          <line
            x1={sw}
            y1={half}
            x2={size - sw}
            y2={half}
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinecap="round"
          />
        </svg>
      )

    case "diamond": {
      const pts = `${half},${sw} ${size - sw},${half} ${half},${size - sw} ${sw},${half}`
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <polygon
            points={pts}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinejoin="round"
          />
        </svg>
      )
    }

    case "arc": {
      const r2 = half - sw
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <path
            d={`M ${sw},${half} A ${r2},${r2} 0 0,1 ${size - sw},${half}`}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinecap="round"
          />
        </svg>
      )
    }

    case "wave": {
      const h = size * 0.45
      const q = size / 4
      return (
        <svg
          width={size}
          height={h}
          viewBox={`0 0 ${size} ${h}`}
          style={{ filter: glowFilter }}
        >
          <path
            d={`M ${sw},${h / 2} Q ${q},${sw} ${size / 2},${h / 2} T ${size - sw},${h / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinecap="round"
          />
        </svg>
      )
    }

    case "hex": {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * Math.PI) / 3 - Math.PI / 6
        const rad = half - sw
        return `${half + rad * Math.cos(angle)},${half + rad * Math.sin(angle)}`
      }).join(" ")
      return (
        <svg
          width={size}
          height={size}
          viewBox={vb}
          style={{ filter: glowFilter }}
        >
          <polygon
            points={pts}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={opacity}
            strokeLinejoin="round"
          />
        </svg>
      )
    }

    default:
      return null
  }
}

export function InteractiveDoodles() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [ripples, setRipples] = useState<RippleDef[]>([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, doodleId: number) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const ripple: RippleDef = { id: Date.now(), doodleId, x, y }
      setRipples(prev => [...prev, ripple])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id))
      }, 700)
    },
    []
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {DOODLES.map(doodle => {
        const isHovered = hoveredId === doodle.id
        const myRipples = ripples.filter(r => r.doodleId === doodle.id)

        return (
          <div
            key={doodle.id}
            className="absolute cursor-pointer transition-[transform,opacity] duration-300"
            style={{
              left: `${doodle.x}%`,
              top: `${doodle.y}%`,
              transform: `rotate(${doodle.rotation}deg) scale(${isHovered ? 1.25 : 1})`,
              animation: `${doodle.animName} ${doodle.animDuration} ${doodle.animDelay} ease-in-out infinite`,
              pointerEvents: "auto"
            }}
            onMouseEnter={() => setHoveredId(doodle.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={e => handleClick(e, doodle.id)}
          >
            {renderShape(doodle.type, doodle.size, doodle.color, isHovered)}

            {myRipples.map(r => (
              <span
                key={r.id}
                className="pointer-events-none absolute block rounded-full"
                style={{
                  left: r.x - 16,
                  top: r.y - 16,
                  width: 32,
                  height: 32,
                  background: `radial-gradient(circle, ${doodle.color}55 0%, transparent 70%)`,
                  animation: "doodleRipple 0.7s ease-out forwards"
                }}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
