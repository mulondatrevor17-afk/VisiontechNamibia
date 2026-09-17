import React from 'react'

export const LoadingState: React.FC<{ full?: boolean }> = ({ full = true }) => {
  if (full) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 animate-spin text-[#D4A017]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
        <p className="text-[#8A8A8A]">Loading…</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-[200px] w-full rounded-xl bg-[#1A1A1A]" />
      <div className="h-4 w-3/4 bg-[#252321] rounded" />
      <div className="h-4 w-1/2 bg-[#252321] rounded" />
    </div>
  )
}

export default LoadingState
