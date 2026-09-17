import React from 'react'
import { motion } from 'framer-motion'

export interface StatBadgeProps {
  value: string
  label: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

const posMap: Record<string, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
}

export const StatBadge: React.FC<StatBadgeProps> = ({ value, label, position = 'top-right', className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${posMap[position]} bg-[#1A1A1A]/90 backdrop-blur-md border border-[#252321] rounded-2xl px-4 py-2 shadow-xl ${className}`}
    >
      <p className="text-[#D4A017] text-lg font-bold leading-none">{value}</p>
      <p className="text-[#8A8A8A] text-xs leading-none">{label}</p>
    </motion.div>
  )
}

export default StatBadge
