// shared/ui/Cargando.jsx — spinner global reutilizable para rutas protegidas y Suspense
const Cargando = () => (
  <div className="flex min-h-screen items-center justify-center bg-[var(--color-fondo)]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-marca-azulClaro border-t-marca-naranja" />
  </div>
)

export default Cargando
