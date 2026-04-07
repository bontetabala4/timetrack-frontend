import { motion } from 'motion/react'
import { BarChart3, FileText, LogOut, QrCode, Users } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

const menuItems = [
  { label: 'Dashboard', icon: BarChart3, path: '/admin/dashboard' },
  { label: 'Utilisateurs', icon: Users, path: '/admin/users' },
  { label: 'Rapports', icon: FileText, path: '/admin/reports' },
  { label: 'QR Code', icon: QrCode, path: '/admin/qrcodes' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { showToast } = useToast()

  const handleLogout = () => {
    logout()
    showToast('Déconnexion réussie', 'success')
    navigate('/')
  }

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen w-72 flex-col border-r border-slate-800 bg-slate-950"
    >
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 font-bold text-slate-950"
          >
            TT
          </motion.div>

          <div>
            <h1 className="text-xl font-bold text-white">TimeTrack</h1>
            <p className="text-sm text-slate-400">Admin panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 * index }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </motion.div>
          )
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </motion.aside>
  )
}