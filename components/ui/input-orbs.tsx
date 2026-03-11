"use client"

import { FC, useCallback, useEffect, useRef } from "react"

const SIZE = 26
const FLEE_RADIUS = 110
const FLEE_STRENGTH = 14
const SPRING_K = 0.07
const DAMPING = 0.72

interface OrbDef {
  id: number
  color: string
  glow: string
  shape: "star" | "eye" | "bolt" | "gem" | "moon" | "ring"
  baseX: number
  idleDelay: number
  idleDuration: number
}

const ORBS: OrbDef[] = [
  {
    id: 0,
    color: "#60a5fa",
    glow: "#3b82f699",
    shape: "star",
    baseX: -125,
    idleDelay: 0,
    idleDuration: 2.8
  },
  {
    id: 1,
    color: "#c084fc",
    glow: "#7c3aed99",
    shape: "eye",
    baseX: -75,
    idleDelay: 0.35,
    idleDuration: 3.2
  },
  {
    id: 2,
    color: "#4ade80",
    glow: "#16a34a99",
    shape: "bolt",
    baseX: -25,
    idleDelay: 0.7,
    idleDuration: 2.5
  },
  {
    id: 3,
    color: "#fb923c",
    glow: "#ea580c99",
    shape: "gem",
    baseX: 25,
    idleDelay: 1.05,
    idleDuration: 3.5
  },
  {
    id: 4,
    color: "#f472b6",
    glow: "#db277799",
    shape: "moon",
    baseX: 75,
    idleDelay: 1.4,
    idleDuration: 2.9
  },
  {
    id: 5,
    color: "#fbbf24",
    glow: "#d9770699",
    shape: "ring",
    baseX: 125,
    idleDelay: 1.75,
    idleDuration: 3.1
  }
]

// ── Shape renderers ────────────────────────────────────────────

function StarSVG({ color }: { color: string }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 26 26" fill="none">
      <path
        d="M13 1 L15.2 10.8 L25 13 L15.2 15.2 L13 25 L10.8 15.2 L1 13 L10.8 10.8 Z"
        fill={color}
      />
      <path
        d="M13 6 L14.3 11.7 L20 13 L14.3 14.3 L13 20 L11.7 14.3 L6 13 L11.7 11.7 Z"
        fill="white"
        opacity="0.45"
      />
    </svg>
  )
}

function EyeSVG({ color }: { color: string }) {
  // Pupil position is updated directly via DOM ref — not React state
  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 26 26" fill="none">
      <ellipse cx="13" cy="13" rx="11" ry="7.5" fill="white" opacity="0.95" />
      <ellipse
        cx="13"
        cy="13"
        rx="11"
        ry="7.5"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* iris */}
      <circle className="eye-iris" cx="13" cy="13" r="5" fill={color} />
      {/* pupil */}
      <circle className="eye-pupil" cx="13" cy="13" r="2.8" fill="#080e18" />
      {/* highlight */}
      <circle className="eye-shine" cx="14.2" cy="11.8" r="1.1" fill="white" />
    </svg>
  )
}

function BoltSVG({ color }: { color: string }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 26 26" fill="none">
      <path
        d="M16 2 L8 15 L13.5 15 L10 24 L20 11 L14.5 11 Z"
        fill={color}
        strokeLinejoin="round"
      />
      <path
        d="M16 2 L8 15 L13.5 15 L10 24 L20 11 L14.5 11 Z"
        fill="white"
        opacity="0.25"
      />
    </svg>
  )
}

function GemSVG({ color }: { color: string }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 26 26" fill="none">
      <path d="M13 2 L22 8 L18 24 L8 24 L4 8 Z" fill={color} />
      <path d="M13 2 L22 8 L13 6 L4 8 Z" fill="white" opacity="0.5" />
      <path d="M13 6 L18 24 L13 19 L8 24 Z" fill="white" opacity="0.18" />
    </svg>
  )
}

function MoonSVG({ color }: { color: string }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 26 26" fill="none">
      <path
        d="M19.5 14 A9 9 0 1 1 12 4.5 A6.5 6.5 0 0 0 19.5 14 Z"
        fill={color}
      />
    </svg>
  )
}

function RingSVG({ color }: { color: string }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="9" stroke={color} strokeWidth="2.5" />
      <circle
        cx="13"
        cy="13"
        r="5"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="13" cy="13" r="2" fill={color} opacity="0.8" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────

interface InputOrbsProps {
  userInput: string
}

export const InputOrbs: FC<InputOrbsProps> = ({ userInput }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const physicsRef = useRef(ORBS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })))
  const elRefs = useRef<(HTMLDivElement | null)[]>([])
  const eyeSvgRef = useRef<SVGSVGElement | null>(null)
  const rafRef = useRef<number>()
  const prevInputLenRef = useRef(0)
  const typingUntilRef = useRef(0)

  // Detect typing
  useEffect(() => {
    if (userInput.length !== prevInputLenRef.current) {
      typingUntilRef.current = Date.now() + 600
      prevInputLenRef.current = userInput.length
    }
  }, [userInput])

  // Track mouse globally
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const animate = useCallback(() => {
    const container = containerRef.current
    if (!container) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    const rect = container.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const isTyping = Date.now() < typingUntilRef.current

    ORBS.forEach((orb, i) => {
      const p = physicsRef.current[i]
      const el = elRefs.current[i]
      if (!el) return

      // Spring back to base
      p.vx += (0 - p.x) * SPRING_K
      p.vy += (0 - p.y) * SPRING_K

      // Flee from cursor
      const wx = cx + orb.baseX + p.x
      const wy = cy + p.y
      const dx = wx - mx
      const dy = wy - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < FLEE_RADIUS && dist > 0.5) {
        const force = ((FLEE_RADIUS - dist) / FLEE_RADIUS) * FLEE_STRENGTH
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }

      // Typing jitter — they wiggle excitedly
      if (isTyping) {
        p.vx += (Math.random() - 0.5) * 2.5
        p.vy += (Math.random() - 0.5) * 2.5
      }

      // Dampen
      p.vx *= DAMPING
      p.vy *= DAMPING

      // Integrate
      p.x += p.vx
      p.y += p.vy

      // Apply transform (add to CSS idle animation)
      el.style.translate = `${p.x}px ${p.y}px`

      // Dynamic glow based on speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      const glowSize = 3 + Math.min(speed * 1.5, 10)
      el.style.filter = `drop-shadow(0 0 ${glowSize}px ${orb.glow})`

      // Pupil tracking for eye orb
      if (orb.shape === "eye" && eyeSvgRef.current) {
        const angle = Math.atan2(my - wy, mx - wx)
        const pr = 3.2
        const px = 13 + Math.cos(angle) * pr
        const py = 13 + Math.sin(angle) * pr
        const iris = eyeSvgRef.current.querySelector(".eye-iris")
        const pupil = eyeSvgRef.current.querySelector(".eye-pupil")
        const shine = eyeSvgRef.current.querySelector(".eye-shine")
        if (iris) {
          iris.setAttribute("cx", String(px))
          iris.setAttribute("cy", String(py))
        }
        if (pupil) {
          pupil.setAttribute("cx", String(px))
          pupil.setAttribute("cy", String(py))
        }
        if (shine) {
          shine.setAttribute("cx", String(px + 1.2))
          shine.setAttribute("cy", String(py - 1.2))
        }
      }
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  const handleClick = (i: number) => {
    const el = elRefs.current[i]
    if (!el) return
    const p = physicsRef.current[i]
    // Burst outward then spring back
    p.vx += (Math.random() - 0.5) * 20
    p.vy -= 12 + Math.random() * 8
    // Visual pop
    el.style.transition = "scale 0.15s cubic-bezier(0.34,1.56,0.64,1)"
    el.style.scale = "1.9"
    setTimeout(() => {
      el.style.transition = "scale 0.25s ease"
      el.style.scale = "1"
      setTimeout(() => {
        el.style.transition = ""
      }, 250)
    }, 150)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-10 w-full items-center justify-center"
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <div
          key={orb.id}
          ref={el => {
            elRefs.current[i] = el
          }}
          className="absolute cursor-pointer select-none"
          style={{
            left: `calc(50% + ${orb.baseX}px - ${SIZE / 2}px)`,
            top: `calc(50% - ${SIZE / 2}px)`,
            filter: `drop-shadow(0 0 4px ${orb.glow})`,
            animation: `orbFloat ${orb.idleDuration}s ${orb.idleDelay}s ease-in-out infinite`
          }}
          onClick={() => handleClick(i)}
        >
          {orb.shape === "star" && <StarSVG color={orb.color} />}
          {orb.shape === "eye" && (
            <div
              ref={el => {
                if (el)
                  eyeSvgRef.current = el.querySelector("svg") as SVGSVGElement
              }}
            >
              <EyeSVG color={orb.color} />
            </div>
          )}
          {orb.shape === "bolt" && <BoltSVG color={orb.color} />}
          {orb.shape === "gem" && <GemSVG color={orb.color} />}
          {orb.shape === "moon" && <MoonSVG color={orb.color} />}
          {orb.shape === "ring" && <RingSVG color={orb.color} />}
        </div>
      ))}
    </div>
  )
}
