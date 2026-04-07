import { motion } from 'motion/react'
import { Download, RefreshCw, ShieldCheck } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import { activeQrCode, qrHistory } from '../../data/qrcodes'
import { useToast } from '../../hooks/useToast'

export default function QrCodes() {
  const { showToast } = useToast()

  return (
    <AdminLayout
      title="Gestion des QR Codes"
      subtitle="Crée, surveille et consulte les QR codes de pointage"
    >
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="xl:col-span-1 rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">QR actif</h3>
              <p className="mt-1 text-sm text-slate-400">
                Code en cours de validité
              </p>
            </div>

            <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-400">
              <ShieldCheck size={22} />
            </div>
          </div>

          <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950">
            <div className="text-center">
              <div className="mx-auto grid h-40 w-40 place-items-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500">
                QR IMAGE
              </div>
              <p className="mt-4 text-sm text-slate-400">{activeQrCode.code}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Expiration</p>
              <p className="mt-1 font-medium text-white">{activeQrCode.expiresAt}</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">Statut</p>
              <p className="mt-1 font-medium text-emerald-400">{activeQrCode.status}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => showToast('Nouveau QR Code généré', 'success')}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <RefreshCw size={18} />
              Générer
            </button>

            <button
              onClick={() => showToast('Téléchargement démarré', 'info')}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              <Download size={18} />
              Télécharger
            </button>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Historique des QR codes
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Suivi des générations et des scans
              </p>
            </div>

            <button
              onClick={() => showToast('Export en préparation', 'info')}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Exporter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 text-sm text-slate-400">
                  <th className="pb-3 font-medium">Code</th>
                  <th className="pb-3 font-medium">Créé le</th>
                  <th className="pb-3 font-medium">Expire le</th>
                  <th className="pb-3 font-medium">Scans</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {qrHistory.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.08 }}
                    className="border-b border-slate-800/70"
                  >
                    <td className="py-4 text-white">{item.code}</td>
                    <td className="py-4 text-slate-300">{item.createdAt}</td>
                    <td className="py-4 text-slate-300">{item.expiresAt}</td>
                    <td className="py-4 text-slate-300">{item.scans}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === 'Actif'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>
      </section>
    </AdminLayout>
  )
}