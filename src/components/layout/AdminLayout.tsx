import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import PageLoader from '../ui/PageLoader'
import { useLocation } from 'react-router-dom'
import { main } from 'motion/react-m'

type AdminLayoutProps = {
  children: React.ReactNode
  title: string
  subtitle: string
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
    const location = useLocation()
    const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    setIsPageLoading(true)

    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatePresence>{isPageLoading && <PageLoader />}</AnimatePresence>

      <div className="flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar title={title} subtitle={subtitle} />
          
          <AnimatePresence mode="wait">
            {!isPageLoading && (
                <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }} 
                className="flex-1 p-6"
                >
                {children}
                </motion.main>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}