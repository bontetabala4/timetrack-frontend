import { motion } from 'motion/react'
import { ShieldCheck, UserCheck, UserMinus, Users as UsersIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import AddUserModal from '../../components/forms/AddUserModal'
import UserDetailsDrawer from '../../components/forms/UserDetailsDrawer'
import SearchInput from '../../components/ui/SearchInput'
import UsersSummaryCard from '../../components/ui/UsersSummaryCard'
import { usersData, type UserItem } from '../../data/users'
import { useToast } from '../../hooks/useToast'

const ITEMS_PER_PAGE = 5

export default function Users() {
  const [users, setUsers] = useState<UserItem[]>(usersData)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tous')
  const [roleFilter, setRoleFilter] = useState('Tous')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { showToast } = useToast()

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()) ||
        user.department.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'Tous' || user.status === statusFilter

      const matchesRole = roleFilter === 'Tous' || user.role === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [users, search, statusFilter, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE))

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredUsers.slice(start, end)
  }, [filteredUsers, currentPage])

  const activeUsersCount = users.filter((user) => user.status === 'Actif').length
  const suspendedUsersCount = users.filter((user) => user.status === 'Suspendu').length
  const adminUsersCount = users.filter((user) => user.role === 'Admin').length

  const handleAddUser = (user: Omit<UserItem, 'id' | 'department' | 'lastCheckIn' | 'phone'>) => {
    const newUser: UserItem = {
      id: Date.now(),
      ...user,
      department: 'Non défini',
      lastCheckIn: '--:--',
      phone: '+243 --- --- ---',
    }

    setUsers((current) => [newUser, ...current])
    setCurrentPage(1)
    showToast('Utilisateur ajouté avec succès', 'success')
  }

  const handleViewDetails = (user: UserItem) => {
    setSelectedUser(user)
  }

  return (
    <AdminLayout
      title="Gestion des utilisateurs"
      subtitle="Consulte, filtre et administre les comptes de la plateforme"
    >
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <UsersSummaryCard
          title="Total utilisateurs"
          value={users.length}
          icon={UsersIcon}
          delay={0.05}
        />
        <UsersSummaryCard
          title="Comptes actifs"
          value={activeUsersCount}
          icon={UserCheck}
          delay={0.1}
        />
        <UsersSummaryCard
          title="Comptes suspendus"
          value={suspendedUsersCount}
          icon={UserMinus}
          delay={0.15}
        />
        <UsersSummaryCard
          title="Administrateurs"
          value={adminUsersCount}
          icon={ShieldCheck}
          delay={0.2}
        />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex flex-col gap-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Liste des utilisateurs
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Vue complète des comptes enregistrés
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Ajouter un utilisateur
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_220px_220px]">
            <SearchInput
              value={search}
              onChange={(value) => {
                setSearch(value)
                setCurrentPage(1)
              }}
              placeholder="Rechercher par nom, email, rôle ou département..."
            />

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setCurrentPage(1)
              }}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            >
              <option>Tous</option>
              <option>Actif</option>
              <option>Suspendu</option>
            </select>

            <select
              value={roleFilter}
              onChange={(event) => {
                setRoleFilter(event.target.value)
                setCurrentPage(1)
              }}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            >
              <option>Tous</option>
              <option>Employé</option>
              <option>Manager</option>
              <option>RH</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-800 text-sm text-slate-400">
                <th className="pb-3 font-medium">Nom</th>
                <th className="pb-3 font-medium">Département</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Rôle</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium">Dernier pointage</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="border-b border-slate-800/70"
                >
                  <td className="py-4 text-white">{user.name}</td>
                  <td className="py-4 text-slate-300">{user.department}</td>
                  <td className="py-4 text-slate-300">{user.email}</td>
                  <td className="py-4 text-slate-300">{user.role}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === 'Actif'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-300">{user.lastCheckIn}</td>
                  <td className="py-4">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
                    >
                      Voir détails
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-slate-800 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            {filteredUsers.length} utilisateur(s) trouvé(s)
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Précédent
            </button>

            <span className="px-3 text-sm text-slate-300">
              Page {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>
      </section>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <UserDetailsDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </AdminLayout>
  )
}