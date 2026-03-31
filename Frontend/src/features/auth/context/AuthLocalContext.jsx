// auth/context/AuthLocalContext.jsx — estado local de la feature auth (mensajes de UI, pasos de flujo)
import { createContext, useState, useContext } from 'react'

const AuthLocalContext = createContext(null)

export const AuthLocalProvider = ({ children }) => {
  const [mensajeUI, setMensajeUI] = useState('') // mensaje de feedback en los formularios

  const valor = { mensajeUI, setMensajeUI }

  return <AuthLocalContext.Provider value={valor}>{children}</AuthLocalContext.Provider>
}

export const useAuthLocal = () => {
  const ctx = useContext(AuthLocalContext)
  if (!ctx) throw new Error('useAuthLocal debe usarse dentro de <AuthLocalProvider>')
  return ctx
}

export default AuthLocalContext
