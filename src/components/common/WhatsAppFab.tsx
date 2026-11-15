import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { getWhatsAppUrl } from '@/lib/formatters'

interface WhatsAppFabProps {
  phone?: string
  message?: string
}

export function WhatsAppFab({
  phone = '94779876543',
  message = 'Hi IBD Auto, I would like to inquire about available vehicles.',
}: WhatsAppFabProps) {
  const [isHovered, setIsHovered] = useState(false)
  const waUrl = getWhatsAppUrl(phone, message)

  return (
    <aside
      aria-label="Direct WhatsApp Assistance"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-[calc(1.25rem+env(safe-area-inset-right,0px))] z-50 flex items-center gap-2.5 print:hidden pointer-events-auto touch-manipulation"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 dark:bg-zinc-100/95 text-white dark:text-zinc-900 text-xs font-medium shadow-lg backdrop-blur-md border border-white/10 dark:border-black/10 select-none"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with IBD Auto on WhatsApp"
        className="group relative flex size-13 sm:size-14 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
      >
        {/* Pulsing subtle ring effect */}
        <span
          className="absolute -inset-1 rounded-full bg-emerald-500/30 opacity-75 blur-xs group-hover:opacity-100 transition-opacity animate-pulse"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="relative size-6 sm:size-7 text-white transition-transform duration-300 group-hover:scale-110" />

        {/* Live Status Pip */}
        <span
          className="absolute top-0.5 right-0.5 size-3.5 rounded-full bg-white flex items-center justify-center shadow-xs"
          aria-hidden="true"
        >
          <span className="size-2 rounded-full bg-emerald-600" />
        </span>
      </a>
    </aside>
  )
}
