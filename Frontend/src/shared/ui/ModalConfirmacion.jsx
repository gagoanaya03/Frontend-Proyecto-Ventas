// shared/ui/ModalConfirmacion.jsx — modal de confirmación reutilizable para acciones destructivas
const ModalConfirmacion = ({
  titulo      = '¿Estás seguro?',
  descripcion = 'Esta acción no se puede deshacer.',
  textoConfirmar = 'Eliminar',
  textoCancelar  = 'Cancelar',
  onConfirmar,
  onCancelar,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--marca-texto)]/40 backdrop-blur-[2px]">
    <div className="w-80 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 shadow-2xl text-center">
      <p className="font-bold text-marca-texto mb-2">{titulo}</p>
      {descripcion && (
        <p className="text-sm text-marca-textoSuave mb-5">{descripcion}</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={onConfirmar}
          className="flex-1 rounded-xl bg-[var(--color-error)] py-2.5 text-sm font-bold text-[var(--color-superficie)] transition hover:opacity-90"
        >
          {textoConfirmar}
        </button>
        <button
          onClick={onCancelar}
          className="flex-1 rounded-xl border border-[var(--color-borde)] py-2.5 text-sm font-semibold text-marca-textoSuave transition hover:text-marca-texto"
        >
          {textoCancelar}
        </button>
      </div>
    </div>
  </div>
)

export default ModalConfirmacion
