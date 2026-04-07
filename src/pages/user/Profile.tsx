import { motion } from 'motion/react'
import {
  BadgeCheck,
  Building2,
  IdCard,
  Mail,
  Phone,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { profileData } from '../../data/profile'

export default function Profile() {
  return (
    <UserLayout>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-slate-950 shadow-lg shadow-emerald-500/25">
            {profileData.fullName.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Mon profil</h1>
            <p className="mt-1 text-sm text-slate-300">
              Informations personnelles et professionnelles
            </p>
          </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900/70 text-3xl font-bold text-white">
              {profileData.fullName.charAt(0)}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                {profileData.fullName}
              </h2>
              <p className="mt-1 text-sm text-slate-300">{profileData.role}</p>

              <span className="mt-3 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                {profileData.status}
              </span>
            </div>
          </div>
        </motion.section>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-1 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Adresse e-mail</p>
                <p className="mt-1 break-all text-white">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-1 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Téléphone</p>
                <p className="mt-1 text-white">{profileData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 size={18} className="mt-1 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Département</p>
                <p className="mt-1 text-white">{profileData.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="mt-1 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Rôle</p>
                <p className="mt-1 text-white">{profileData.role}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <IdCard size={18} className="mt-1 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Matricule</p>
                <p className="mt-1 text-white">{profileData.employeeId}</p>
              </div>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
          className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl xl:col-span-2"
        >
          <h3 className="text-lg font-semibold text-white">Actions rapides</h3>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900/60 px-4 py-4 text-sm font-medium text-white transition hover:bg-slate-800">
              <Settings size={18} />
              Paramètres
            </button>

            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900/60 px-4 py-4 text-sm font-medium text-white transition hover:bg-slate-800">
              <BadgeCheck size={18} />
              Vérifier compte
            </button>

            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900/60 px-4 py-4 text-sm font-medium text-white transition hover:bg-slate-800">
              <Mail size={18} />
              Support
            </button>

            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900/60 px-4 py-4 text-sm font-medium text-white transition hover:bg-slate-800">
              <Phone size={18} />
              Contact
            </button>
          </div>
        </motion.article>
      </div>
    </UserLayout>
  )
}