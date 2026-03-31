import { useNavigate } from 'react-router-dom'
import { Save, ShieldCheck, LogOut } from 'lucide-react'
import useAuth from '../../../shared/hooks/useAuth'
import usePerfil from '../hooks/usePerfil'
import SeccionDatosPersonales from '../components/SeccionDatosPersonales'
import SeccionSeguridad from '../components/SeccionSeguridad'

const ProfilePage = () => {
  const navegar = useNavigate()
  const { cerrarSesion } = useAuth()
  const { 
    datos, 
    claves, 
    cargando, 
    mensaje, 
    manejarCambioDatos, 
    manejarCambioClaves, 
    actualizarDatos, 
    actualizarPassword 
  } = usePerfil()

  return (
    <div className="contenedor py-10 max-w-4xl">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-marca-texto tracking-tight">Configuración de Perfil</h1>
        <p className="text-marca-textoSuave text-lg mt-2">Personaliza tu cuenta y mantén tu seguridad al día</p>
      </div>

      {mensaje.texto && (
        <div className={`mb-8 flex items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold shadow-sm transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${
          mensaje.tipo === 'exito' 
            ? 'border-green-500/30 bg-green-500/10 text-green-400' 
            : 'border-red-500/30 bg-red-500/10 text-red-400'
        }`}>
          {mensaje.tipo === 'exito' ? <Save size={18} /> : <ShieldCheck size={18} />}
          {mensaje.texto}
        </div>
      )}

      <div className="grid gap-8">
        {/* Sección: Datos Personales */}
        <SeccionDatosPersonales 
          datos={datos} 
          cargando={cargando} 
          manejarCambio={manejarCambioDatos} 
          alGuardar={actualizarDatos} 
        />

        {/* Sección: Cambio de Contraseña */}
        <SeccionSeguridad 
          claves={claves} 
          cargando={cargando} 
          manejarCambio={manejarCambioClaves} 
          alGuardar={actualizarPassword} 
        />

        {/* Cierre de sesión secundario */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              cerrarSesion();
              navegar('/');
            }}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-red-500 transition hover:text-red-400 hover:bg-red-500/5 rounded-xl"
          >
            <LogOut size={18} />
            Cerrar sesión en este dispositivo
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

