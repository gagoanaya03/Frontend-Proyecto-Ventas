// RutaCliente.jsx — requiere sesión de cliente; admin es redirigido a su panel
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../shared/hooks/useAuth'
import { Cargando } from '../shared/ui'

const RutaCliente = () => {
  const { estaAutenticado, esAdmin, cargando } = useAuth()
  const ubicacion = useLocation()

  if (cargando) return <Cargando />
  if (!estaAutenticado) return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace />
  if (esAdmin) return <Navigate to="/dashboard/admin" replace /> // admin no accede a rutas de cliente

  return <Outlet />
}

export default RutaCliente
