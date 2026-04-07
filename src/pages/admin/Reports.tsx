import { motion } from 'motion/react'
import AdminLayout from '../../components/layout/AdminLayout'
import { reportCards } from '../../data/reports'

export default function Reports() {
  return (
    <AdminLayout
      title="Rapports et statistiques"
      subtitle="Analyse globale des performances de présence"
    >
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold text-white">{card.value}</h3>
          </motion.article>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Résumé analytique</h3>
            <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white">
              Exporter PDF
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Meilleur jour</p>
              <p className="mt-2 text-lg font-semibold text-white">Mardi</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Heure moyenne d’arrivée</p>
              <p className="mt-2 text-lg font-semibold text-white">08:11</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Département le plus ponctuel</p>
              <p className="mt-2 text-lg font-semibold text-white">Informatique</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Tendance globale</p>
              <p className="mt-2 text-lg font-semibold text-emerald-400">En amélioration</p>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <h3 className="text-xl font-semibold text-white">Période active</h3>
          <p className="mt-2 text-sm text-slate-400">
            Rapport consolidé du mois en cours.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Début</p>
              <p className="mt-1 font-medium text-white">01 Avril 2026</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Fin</p>
              <p className="mt-1 font-medium text-white">30 Avril 2026</p>
            </div>
          </div>
        </motion.article>
      </section>
    </AdminLayout>
  )
}