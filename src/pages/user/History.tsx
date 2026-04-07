import { motion } from 'motion/react'
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  History as HistoryIcon,
} from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { historyData } from '../../data/history'

export default function History() {
  const presentCount = historyData.filter((item) => item.status === 'Présent').length
  const lateCount = historyData.filter((item) => item.status === 'Retard').length
  const absentCount = historyData.filter((item) => item.status === 'Absent').length

  return (
    <UserLayout>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-900/40">
            <HistoryIcon size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Mon historique</h1>
            <p className="mt-1 text-sm text-slate-300">
              Consulte tes présences récentes
            </p>
          </div>
        </div>
      </motion.header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl"
        >
          <p className="text-xs text-slate-300">Présents</p>
          <p className="mt-2 text-2xl font-bold text-emerald-400">{presentCount}</p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl"
        >
          <p className="text-xs text-slate-300">Retards</p>
          <p className="mt-2 text-2xl font-bold text-amber-400">{lateCount}</p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl"
        >
          <p className="text-xs text-slate-300">Absents</p>
          <p className="mt-2 text-2xl font-bold text-red-400">{absentCount}</p>
        </motion.article>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {historyData.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 + index * 0.05 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CalendarDays size={16} />
                  <p className="text-sm">{item.date}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-slate-400">Entrée</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {item.checkIn}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Sortie</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {item.checkOut}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="flex items-center gap-2 text-slate-400 sm:justify-end">
                  <Clock3 size={15} />
                  <span className="text-xs">Pointage</span>
                </div>

                <span
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === 'Présent'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : item.status === 'Retard'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {item.status === 'Présent' && (
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} />
                <span>Présence enregistrée avec succès</span>
              </div>
            )}
          </motion.article>
        ))}
      </section>
    </UserLayout>
  )
}