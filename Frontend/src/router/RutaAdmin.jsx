// RutaAdmin.jsx — requiere sesión de admin; clientes son redirigidos al home
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../shared/hooks/useAuth'
import { Cargando } from '../shared/ui'

const RutaAdmin = () => {
  const { estaAutenticado, esAdmin, cargando } = useAuth()

  if (cargando) return <Cargando />
  if (!estaAutenticado) return <Navigate to="/login" replace />
  if (!esAdmin) return <Navigate to="/" replace /> // clientes no acceden al panel admin

  return <Outlet />
}

export default RutaAdmin
