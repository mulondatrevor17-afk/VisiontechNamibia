import React from 'react'

export const ErrorState: React.FC<{ message?: string; retry?: () => void }> = ({ message, retry }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-[#D4A017]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[#F5F5F0] mb-2">Something went wrong</h2>
      <p className="text-[#8A8A8A] mb-6 max-w-md">{message ?? "We couldn't load this content. Please check your connection and try again."}</p>
      {retry ? (
        <button onClick={retry} className="bg-[#D4A017] text-[#0A0A0A] hover:bg-[#E5B12A] px-4 py-2 rounded-md">
          Try Again
        </button>
      ) : (
        <a href="/" className="bg-[#D4A017] text-[#0A0A0A] hover:bg-[#E5B12A] px-4 py-2 rounded-md">Go Home</a>
      )}
    </div>
  )
}

export default ErrorState
