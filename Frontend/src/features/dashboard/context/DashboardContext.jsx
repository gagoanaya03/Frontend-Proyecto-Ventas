// dashboard/context/DashboardContext.jsx — estado local del panel de administración
import { createContext, useState, useContext } from 'react'

const DashboardContext = createContext(null)

export const DashboardProvider = ({ children }) => {
  const [seccionActiva, setSeccionActiva] = useState('resumen') // sección del panel: resumen, productos, órdenes, usuarios

  const valor = { seccionActiva, setSeccionActiva }

  return <DashboardContext.Provider value={valor}>{children}</DashboardContext.Provider>
}

export const useDashboard = () => {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard debe usarse dentro de <DashboardProvider>')
  return ctx
}

export default DashboardContext
