import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'right' | 'left'
  className?: string
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, side = 'right', className = '' }) => {
  const variants = {
    hidden: { x: side === 'right' ? '100%' : '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: side === 'right' ? '100%' : '-100%', opacity: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          <motion.aside
            className={`absolute top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full w-full sm:w-[420px] bg-[#111111] border-l border-[#252321] p-4 ${className}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-1.5 w-14 rounded-full bg-[#252321] mx-auto" aria-hidden />
              <button onClick={onClose} className="p-2 rounded-md text-[#F5F5F0] hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto h-[calc(100%-64px)]">{children}</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Drawer
