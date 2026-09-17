import React from 'react'

interface GlowPortraitProps {
  src: string
  alt: string
  className?: string
  blob?: boolean
}

export const GlowPortrait: React.FC<GlowPortraitProps> = ({ src, alt, className = '', blob = false }) => {
  const glowStyle: React.CSSProperties = {
    background: 'radial-gradient(circle at 60% 40%, rgba(212,160,23,0.35) 0%, transparent 65%)',
  }

  const blobRadius = '68% 32% 57% 43% / 45% 39% 61% 55%'

  return (
    <div className={`relative ${className}`}>
      {blob ? (
        <div className="relative w-full max-w-md mx-auto">
          <div
            className="absolute inset-0 -z-10"
            style={{ backgroundColor: '#D4A017', borderRadius: blobRadius }}
          />
          <img src={src} alt={alt} loading="eager" className="relative w-full h-auto object-cover" style={{ borderRadius: blobRadius }} />
        </div>
      ) : (
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-35" style={glowStyle} />
          <img src={src} alt={alt} loading="eager" className="relative rounded-full md:rounded-[2.5rem] object-cover w-full h-full" />
        </div>
      )}
    </div>
  )
}

export default GlowPortrait
