// home/context/HomeContext.jsx — contexto local de home (disponible para expansión futura)
import { createContext, useContext } from 'react'

const HomeContext = createContext(null)

export const HomeProvider = ({ children }) => (
  <HomeContext.Provider value={{}}>
    {children}
  </HomeContext.Provider>
)

export const useHomeContext = () => {
  const ctx = useContext(HomeContext)
  if (!ctx) throw new Error('useHomeContext debe usarse dentro de <HomeProvider>')
  return ctx
}

export default HomeContext
