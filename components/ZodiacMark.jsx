export default function ZodiacMark({ className = '' }) {
  const round = (n) => Math.round(n * 1000) / 1000

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="29" stroke="#C9A24B" strokeWidth="1" opacity="0.55" />
      <circle cx="32" cy="32" r="23" stroke="#C9A24B" strokeWidth="1" opacity="0.85" />
      {/* 12 house ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = round(32 + 23 * Math.sin(angle))
        const y1 = round(32 - 23 * Math.cos(angle))
        const x2 = round(32 + 27 * Math.sin(angle))
        const y2 = round(32 - 27 * Math.cos(angle))
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#C9A24B"
            strokeWidth={i % 3 === 0 ? '1.4' : '0.8'}
            opacity={i % 3 === 0 ? '0.95' : '0.5'}
          />
        )
      })}
      {/* central lotus / sun point */}
      <circle cx="32" cy="32" r="5.5" fill="#C9A24B" opacity="0.95" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const x = round(32 + 10.5 * Math.sin(angle))
        const y = round(32 - 10.5 * Math.cos(angle))
        return <circle key={i} cx={x} cy={y} r="1.3" fill="#C9A24B" opacity="0.8" />
      })}
    </svg>
  )
}