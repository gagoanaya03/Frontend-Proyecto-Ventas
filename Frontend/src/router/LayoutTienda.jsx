// router/LayoutTienda.jsx — layout principal de la tienda: Navbar + Sidebar + CartDrawer + contenido + Footer
import { useState, useCallback } from 'react'
import { Navbar, Sidebar, CartDrawer, Footer } from '../shared/components'

// Envuelve todas las rutas de la tienda con la navegación global
const LayoutTienda = ({ children }) => {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const abrirSidebar  = useCallback(() => setSidebarAbierto(true),  [])
  const cerrarSidebar = useCallback(() => setSidebarAbierto(false), [])

  return (
    <>
      <Navbar onAbrirSidebar={abrirSidebar} />
      <Sidebar estaAbierto={sidebarAbierto} onCerrar={cerrarSidebar} />
      <CartDrawer />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
    </>
  )
}

export default LayoutTienda
