// App.jsx — monta providers globales y renderiza el router
import { TemaProvider }    from './shared/context/TemaContext'
import { AuthProvider }    from './shared/context/AuthContext'
import { CarritoProvider } from './shared/context/CarritoContext'
import AppRouter           from './router/AppRouter'

const App = () => (
  <TemaProvider>
    <AuthProvider>
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </AuthProvider>
  </TemaProvider>
)

export default App
