import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageWrapperProps {
  children: React.ReactNode
  locationKey?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, locationKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey || 'page'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageWrapper
