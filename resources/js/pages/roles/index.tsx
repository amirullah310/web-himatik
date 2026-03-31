import { RoleFormModal } from '@/components/RoleFormModal';
import { RolePermissionFormModal } from '@/components/RolePermissionFormModal';
import { RoleTable } from '@/components/RoleTable';
import { RoleUserFormModal } from '@/components/RoleUserModal/RoleUserFormModal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Plus, Shield, Users, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Role() {
  const { roles = [], permissions = [], users = [], canManageUsers = false, auth } =
    usePage().props as any;

  const [openFormModal, setOpenFormModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [managedRoleId, setManagedRoleId] = useState<number | null>(null);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const managedRole = roles.find((r: any) => r.id === managedRoleId) || null;

  return (
    <AppLayout breadcrumbs={[{ title: 'Role', href: '/roles' }]}>
      <Head title="Manajemen Role" />
      <motion.div
        className="flex h-full flex-1 flex-col gap-8 rounded-xl bg-gradient-to-b from-white to-gray-50 dark:from-[#0B0B0F] dark:to-[#151519] p-6 sm:p-8 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col gap-2 border-b border-gray-200 dark:border-purple-900/40 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Manajemen Role & Hak Akses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl">
            Atur role, izin, dan pengelompokan pengguna untuk menjaga keamanan dan keteraturan sistem HIMATIK.
          </p>
        </header>

        {/* Statistik Ringkas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            icon={<Shield className="text-purple-400 h-5 w-5" />}
            title="Total Role"
            value={roles.length}
            subtitle="Peran yang tersedia di sistem"
          />
          <InfoCard
            icon={<Key className="text-purple-400 h-5 w-5" />}
            title="Total Permission"
            value={permissions.length}
            subtitle="Hak akses yang terdaftar"
          />
          <InfoCard
            icon={<Users className="text-purple-400 h-5 w-5" />}
            title="Total Pengguna"
            value={users.length}
            subtitle="Pengguna terdaftar di sistem"
          />
        </section>

        {/* Tabel Role */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Daftar Role
            </h2>
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition"
              onClick={() => {
                setEditData(null);
                setOpenFormModal(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Role
            </Button>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <div className="rounded-2xl bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-purple-900/30 shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_25px_rgba(168,85,247,0.15)] p-4 sm:p-6 transition-colors">
              <RoleTable
                data={roles}
                onEdit={(role) => {
                  setEditData(role);
                  setOpenFormModal(true);
                }}
                onManagePermissions={(role) => {
                  setManagedRoleId(role.id);
                  setOpenPermissionModal(true);
                }}
                onManageUsers={(role) => {
                  setManagedRoleId(role.id);
                  setOpenUserModal(true);
                }}
                canManageUsers={canManageUsers}
              />
            </div>
          </motion.div>
        </section>

        {/* Modal: Tambah/Ubah Role */}
        <RoleFormModal
          open={openFormModal}
          onClose={() => {
            setOpenFormModal(false);
            setEditData(null);
          }}
          initialData={editData}
        />

        {/* Modal: Kelola Permissions & Users */}
        {managedRole && (
          <>
            <RolePermissionFormModal
              open={openPermissionModal}
              onClose={() => {
                setOpenPermissionModal(false);
                setManagedRoleId(null);
              }}
              role={managedRole}
              allPermissions={permissions}
            />

            <RoleUserFormModal
              open={openUserModal}
              onClose={() => {
                setOpenUserModal(false);
                setManagedRoleId(null);
              }}
              role={managedRole}
              allUsers={users}
              currentUser={auth.user}
            />
          </>
        )}
      </motion.div>
    </AppLayout>
  );
}

/* Info Card - Statistik Ringkas */
function InfoCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-gray-200 dark:border-purple-900/40 bg-white dark:bg-[#1a1a22] p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/40">
          {icon}
        </div>
        <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{value}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
    </motion.div>
  );
}
