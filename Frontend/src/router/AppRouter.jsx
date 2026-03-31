// AppRouter.jsx — enrutador principal con layouts separados para tienda y admin
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Cargando } from '../shared/ui'
import LayoutTienda from './LayoutTienda'
import RutaCliente from './RutaCliente'
import RutaAdmin   from './RutaAdmin'
import RutaPublica from './RutaPublica'

// Tienda
const HomePage      = lazy(() => import('../features/home/pages/HomePage'))
const ProductsPage  = lazy(() => import('../features/products/pages/ProductsPage'))
const ProductDetail = lazy(() => import('../features/products/pages/ProductDetail'))
const CartPage      = lazy(() => import('../features/cart/pages/CartPage'))
const CheckoutPage  = lazy(() => import('../features/cart/pages/CheckoutPage'))
const ProfilePage   = lazy(() => import('../features/profile/pages/ProfilePage'))

// Auth
const LoginPage    = lazy(() => import('../features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'))
const RecoverPage  = lazy(() => import('../features/auth/pages/RecoverPage'))

// Dashboard admin
const AdminLayout          = lazy(() => import('../features/dashboard/components/AdminLayout'))
const DashboardPage        = lazy(() => import('../features/dashboard/pages/DashboardPage'))
const ProductosAdminPage   = lazy(() => import('../features/dashboard/pages/ProductosAdminPage'))
const CategoriasAdminPage  = lazy(() => import('../features/dashboard/pages/CategoriasAdminPage'))
const UsuariosAdminPage    = lazy(() => import('../features/dashboard/pages/UsuariosAdminPage'))
const VentasAdminPage      = lazy(() => import('../features/dashboard/pages/VentasAdminPage'))
const BannersAdminPage     = lazy(() => import('../features/dashboard/pages/BannersAdminPage'))
const CuponesAdminPage     = lazy(() => import('../features/dashboard/pages/CuponesAdminPage'))
const ConfiguracionAdminPage = lazy(() => import('../features/dashboard/pages/ConfiguracionAdminPage'))


const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Cargando />}>
      <Routes>

        {/* ── RUTAS PÚBLICAS DE LA TIENDA ── */}
        <Route path="/"            element={<LayoutTienda><HomePage     /></LayoutTienda>} />
        <Route path="/products"    element={<LayoutTienda><ProductsPage /></LayoutTienda>} />
        <Route path="/products/:id" element={<LayoutTienda><ProductDetail /></LayoutTienda>} />

        {/* ── RUTAS DE AUTH (redirigen si hay sesión) ── */}
        <Route element={<RutaPublica />}>
          <Route path="/login"    element={<LoginPage    />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recover"  element={<RecoverPage  />} />
        </Route>

        {/* ── RUTAS PRIVADAS DEL CLIENTE ── */}
        <Route element={<RutaCliente />}>
          <Route path="/cart"     element={<LayoutTienda><CartPage     /></LayoutTienda>} />
          <Route path="/checkout" element={<LayoutTienda><CheckoutPage /></LayoutTienda>} />
          <Route path="/profile"  element={<LayoutTienda><ProfilePage  /></LayoutTienda>} />
        </Route>

        {/* ── RUTAS DEL PANEL ADMIN (layout propio) ── */}
        <Route element={<RutaAdmin />}>
          <Route path="/dashboard/admin" element={<AdminLayout />}>
            <Route index                  element={<DashboardPage        />} />
            <Route path="productos"       element={<ProductosAdminPage   />} />
            <Route path="categorias"      element={<CategoriasAdminPage  />} />
            <Route path="usuarios"        element={<UsuariosAdminPage    />} />
            <Route path="ventas"          element={<VentasAdminPage      />} />
            <Route path="banners"         element={<BannersAdminPage     />} />
            <Route path="cupones"         element={<CuponesAdminPage     />} />
            <Route path="configuracion"   element={<ConfiguracionAdminPage />} />
          </Route>
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={
          <LayoutTienda>
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-marca-textoSuave">
              <p className="text-6xl font-extrabold text-marca-naranja">404</p>
              <p className="text-lg font-bold text-marca-texto">Página no encontrada</p>
            </div>
          </LayoutTienda>
        } />

      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default AppRouter
