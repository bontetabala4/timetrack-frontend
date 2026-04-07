import { motion } from 'motion/react'
import { CalendarCheck2, QrCode, TriangleAlert, Users } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import StatCard from '../../components/ui/StatCard'
import { dashboardStats, recentAttendances } from '../../data/dashboard'

const statIcons = [Users, CalendarCheck2, QrCode, TriangleAlert]

export default function Dashboard() {
  return (
    <AdminLayout
      title="Bienvenue, Admin"
      subtitle="Vue d’ensemble des présences et activités"
    >
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = statIcons[index]

          return (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={Icon}
              delay={0.1 + index * 0.1}
            />
          )
        })}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Présences récentes</h3>
            <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:text-white">
              Voir toutes
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 text-sm text-slate-400">
                  <th className="pb-3 font-medium">Utilisateur</th>
                  <th className="pb-3 font-medium">Heure</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentAttendances.map((attendance, index) => (
                  <motion.tr
                    key={attendance.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + index * 0.08 }}
                    className="border-b border-slate-800/70"
                  >
                    <td className="py-4">{attendance.name}</td>
                    <td className="py-4 text-slate-300">{attendance.time}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          attendance.status === 'Présent'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : attendance.status === 'Retard'
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-red-500/15 text-red-400'
                        }`}
                      >
                        {attendance.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <h3 className="text-xl font-semibold">Générer QR Code</h3>
          <p className="mt-2 text-sm text-slate-400">
            Crée le QR code actif pour le pointage du jour.
          </p>

          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-8 flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950 text-slate-500"
          >
            Zone QR Code
          </motion.div>

          <button className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
            Créer un QR Code
          </button>
        </motion.article>
      </section>
    </AdminLayout>
  )
}