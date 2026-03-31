// profile/context/ProfileContext.jsx — estado local de edición del perfil del cliente
import { createContext, useState, useContext } from 'react'

const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
  const [seccion, setSeccion] = useState('datos') // 'datos' | 'contrasena'
  const valor = { seccion, setSeccion }
  return <ProfileContext.Provider value={valor}>{children}</ProfileContext.Provider>
}

export const useProfileContext = () => {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfileContext debe usarse dentro de <ProfileProvider>')
  return ctx
}

export default ProfileContext
