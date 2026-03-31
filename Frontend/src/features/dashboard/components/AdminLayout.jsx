// AdminLayout.jsx — layout principal del panel admin (sidebar + navbar + contenido)
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminNavbar  from './AdminNavbar'

const AdminLayout = () => (
  <div className="flex h-screen overflow-hidden bg-[var(--color-fondo)]">
    <AdminSidebar />
    <div className="flex flex-1 flex-col overflow-hidden">
      <AdminNavbar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  </div>
)

export default AdminLayout
