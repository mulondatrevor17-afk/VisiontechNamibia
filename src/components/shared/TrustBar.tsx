import React from 'react'

interface TrustBarProps {
  logos?: { src: string; alt: string }[]
  metrics?: string[]
}

export const TrustBar: React.FC<TrustBarProps> = ({ logos = [], metrics = [] }) => {
  return (
    <section className="border-y border-[#252321] bg-[#0A0A0A] py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
        {logos.length === 0 && metrics.length === 0 && (
          <span className="text-[#8A8A8A] text-xs uppercase tracking-wider">Trusted across Namibia</span>
        )}

        {metrics.length > 0 && (
          <div className="flex items-center gap-6 text-[#8A8A8A] text-sm">{metrics.map((m, i) => <span key={i}>{m}</span>)}</div>
        )}

        {logos.length > 0 && (
          <div className="flex items-center gap-8">
            {logos.map((l, idx) => (
              <img key={idx} src={l.src} alt={l.alt} className="h-6 opacity-80 grayscale" loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TrustBar
