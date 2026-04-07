import { motion, AnimatePresence } from 'motion/react'
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  QrCode,
} from 'lucide-react'
import { useState } from 'react'
import UserLayout from '../../components/layout/UserLayout'
import { useToast } from '../../hooks/useToast'

type ScanState = 'idle' | 'loading' | 'success' | 'error'

export default function Scan() {
  const currentTime = '08:12'
  const currentDate = 'Mardi, 07 Avril 2026'
  const userName = 'Jean Dupont'
  const isOnTime = true

  const [scanState, setScanState] = useState<ScanState>('idle')
  const [lastScanMessage, setLastScanMessage] = useState('')
  const [scannedAt, setScannedAt] = useState<string | null>(null)

  const { showToast } = useToast()

  const handleScan = () => {
    if (scanState === 'loading') return

    setScanState('loading')
    setLastScanMessage('Vérification du QR code en cours...')

    setTimeout(() => {
      const success = Math.random() > 0.2

      if (success) {
        const now = new Date()
        const time = now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })

        setScanState('success')
        setScannedAt(time)
        setLastScanMessage(`Présence enregistrée avec succès à ${time}`)
        showToast('Pointage enregistré avec succès', 'success')
      } else {
        setScanState('error')
        setLastScanMessage('Échec du scan. QR code invalide ou expiré.')
        showToast('Le scan a échoué. Réessaie.', 'error')
      }
    }, 1800)
  }

  const handleReset = () => {
    setScanState('idle')
    setLastScanMessage('')
  }

  return (
    <UserLayout>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Bonjour {userName},
            </p>
            <p className="mt-2 text-base text-slate-300 sm:text-lg">
              Prêt à pointer ?
            </p>
          </div>

          <p className="text-sm text-slate-300 md:pt-2">{currentDate}</p>
        </div>
      </motion.header>

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl sm:p-6 lg:p-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-slate-950 shadow-lg sm:h-20 sm:w-20 ${
              scanState === 'success'
                ? 'bg-emerald-400 shadow-emerald-500/25'
                : scanState === 'error'
                ? 'bg-red-400 shadow-red-500/25'
                : 'bg-emerald-400 shadow-emerald-500/25'
            }`}
          >
            {scanState === 'success' ? (
              <CheckCircle2 size={34} />
            ) : scanState === 'error' ? (
              <AlertCircle size={34} />
            ) : (
              <QrCode size={34} />
            )}
          </motion.div>

          <div className="text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {scanState === 'success'
                ? 'Scan réussi'
                : scanState === 'error'
                ? 'Scan échoué'
                : 'Scanner le QR Code'}
            </h1>

            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              {scanState === 'success'
                ? 'Votre présence a été enregistrée'
                : scanState === 'error'
                ? 'Le système n’a pas pu valider le code'
                : 'Scanne le code QR à l’entrée pour pointer'}
            </p>
          </div>

          <motion.div
            animate={
              scanState === 'loading'
                ? { opacity: [0.75, 1, 0.75] }
                : { opacity: 1 }
            }
            transition={{
              duration: 1.4,
              repeat: scanState === 'loading' ? Infinity : 0,
            }}
            className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-900/40 p-4 sm:p-5"
          >
            <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/60 sm:h-72 lg:h-80">
              {scanState === 'loading' && (
                <motion.div
                  animate={{ y: [-90, 90, -90] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute left-6 right-6 h-0.5 bg-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.8)] sm:left-10 sm:right-10"
                />
              )}

              <div className="absolute inset-4 rounded-[1.25rem] border border-white/10 sm:inset-6" />

              <div className="absolute left-6 top-6 h-10 w-10 rounded-tl-2xl border-l-4 border-t-4 border-slate-500/70 sm:left-10 sm:top-10 sm:h-12 sm:w-12" />
              <div className="absolute right-6 top-6 h-10 w-10 rounded-tr-2xl border-r-4 border-t-4 border-slate-500/70 sm:right-10 sm:top-10 sm:h-12 sm:w-12" />
              <div className="absolute bottom-6 left-6 h-10 w-10 rounded-bl-2xl border-b-4 border-l-4 border-slate-500/70 sm:bottom-10 sm:left-10 sm:h-12 sm:w-12" />
              <div className="absolute bottom-6 right-6 h-10 w-10 rounded-br-2xl border-b-4 border-r-4 border-slate-500/70 sm:bottom-10 sm:right-10 sm:h-12 sm:w-12" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={scanState}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col items-center gap-4"
                >
                  {scanState === 'loading' ? (
                    <>
                      <LoaderCircle size={64} className="animate-spin text-emerald-400" />
                      <p className="text-sm text-slate-300">Scan en cours...</p>
                    </>
                  ) : scanState === 'success' ? (
                    <>
                      <CheckCircle2 size={72} className="text-emerald-400" />
                      <p className="text-center text-sm text-emerald-300">
                        Présence enregistrée
                      </p>
                    </>
                  ) : scanState === 'error' ? (
                    <>
                      <AlertCircle size={72} className="text-red-400" />
                      <p className="text-center text-sm text-red-300">
                        QR code invalide
                      </p>
                    </>
                  ) : (
                    <QrCode size={74} className="text-slate-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="mt-8 space-y-3">
            <motion.button
              whileHover={scanState !== 'loading' ? { y: -2, scale: 1.01 } : undefined}
              whileTap={scanState !== 'loading' ? { scale: 0.98 } : undefined}
              disabled={scanState === 'loading'}
              onClick={handleScan}
              className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-900/40 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70 sm:text-xl"
            >
              {scanState === 'loading'
                ? 'Scan en cours...'
                : scanState === 'success'
                ? 'Scanner à nouveau'
                : scanState === 'error'
                ? 'Réessayer le scan'
                : 'Scanner maintenant'}
            </motion.button>

            {(scanState === 'success' || scanState === 'error') && (
              <button
                onClick={handleReset}
                className="w-full rounded-2xl bg-slate-800 px-5 py-4 text-base font-medium text-white transition hover:bg-slate-700"
              >
                Réinitialiser
              </button>
            )}
          </div>

          <AnimatePresence>
            {lastScanMessage && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                className={`mt-5 rounded-2xl border px-4 py-4 text-sm ${
                  scanState === 'success'
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    : scanState === 'error'
                    ? 'border-red-500/20 bg-red-500/10 text-red-300'
                    : 'border-slate-700 bg-slate-800/60 text-slate-300'
                }`}
              >
                {lastScanMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-col items-center gap-3 border-t border-white/10 pt-5 text-sm sm:flex-row sm:flex-wrap sm:justify-center">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock3 size={16} />
              <span>Heure actuelle : {currentTime}</span>
            </div>

            <span className="hidden text-slate-500 sm:inline">|</span>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className={isOnTime ? 'text-emerald-400' : 'text-red-400'}
              />
              <span className={isOnTime ? 'text-emerald-400' : 'text-red-400'}>
                {isOnTime ? "Vous êtes à l'heure" : 'Vous êtes en retard'}
              </span>
            </div>

            {scannedAt && (
              <>
                <span className="hidden text-slate-500 sm:inline">|</span>
                <div className="text-slate-300">Dernier scan : {scannedAt}</div>
              </>
            )}
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:p-6 lg:block"
        >
          <h2 className="text-xl font-semibold text-white">Informations du jour</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400">Date</p>
              <p className="mt-1 font-semibold text-white">{currentDate}</p>
            </div>

            <div className="rounded-2xl bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400">Heure actuelle</p>
              <p className="mt-1 font-semibold text-white">{currentTime}</p>
            </div>

            <div className="rounded-2xl bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400">État</p>
              <p
                className={`mt-1 font-semibold ${
                  isOnTime ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {isOnTime ? 'À l’heure' : 'En retard'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400">Statut du scan</p>
              <p className="mt-1 font-semibold text-white">
                {scanState === 'idle'
                  ? 'Prêt'
                  : scanState === 'loading'
                  ? 'Vérification'
                  : scanState === 'success'
                  ? 'Validé'
                  : 'Échec'}
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </UserLayout>
  )
}