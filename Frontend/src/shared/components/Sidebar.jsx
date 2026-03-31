// shared/components/Sidebar.jsx
// Sidebar de categorías con diseño profesional de dos niveles:
//  - PANEL IZQUIERDO: lista de categorías con más espaciado (siempre visible al abrir)
//  - FLYOUT: mini-panel flotante que aparece al LADO DERECHO del panel, posicionado
//    por DEBAJO del header "Categorías" (no a la misma altura).
//  - Soporte completo para modo claro y oscuro.

import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, Zap, Keyboard, Monitor, HardDrive, Headphones, Cpu,
  Shirt, Home, Dumbbell, BookOpen, Sparkles, ChevronRight,
} from 'lucide-react';
import { categorias } from '../utils/mockData';
import useTema from '../hooks/useTema';

/* ── Íconos por categoría ─────────────────────────── */
const ICONOS = {
  electronica:    <Zap size={20} />,
  perifericos:    <Keyboard size={20} />,
  monitores:      <Monitor size={20} />,
  almacenamiento: <HardDrive size={20} />,
  audio:          <Headphones size={20} />,
  accesorios:     <Cpu size={20} />,
  ropa:           <Shirt size={20} />,
  hogar:          <Home size={20} />,
  deportes:       <Dumbbell size={20} />,
  libros:         <BookOpen size={20} />,
  belleza:        <Sparkles size={20} />,
};

const SIDEBAR_W = 248; // ancho del panel izquierdo en px
const HEADER_H  = 64;  // altura del header "Categorías"

/* ── Paletas por tema ─────────────────────────────── */
const COLORES_CLARO = {
  headerBg:         '#2C1FF1',
  headerTexto:      '#FFFFFF',
  headerSubtexto:   'rgba(255,255,255,0.65)',
  headerBorde:      'rgba(255,255,255,0.15)',
  panelBg:          '#FFFFFF',
  panelBorde:       '#E2E8F0',
  itemColor:        '#334155',
  itemColorSoft:    '#94A3B8',
  itemBgHover:      '#F8FAFC',
  itemBgActivo:     '#EEF2FF',
  itemBordeActivo:  '#2C1FF1',
  itemColorActivo:  '#2C1FF1',
  iconColor:        '#F97316',
  flyoutBg:         '#FFFFFF',
  flyoutBorde:      '#E2E8F0',
  flyoutSombra:     '8px 8px 40px rgba(0,0,0,0.14)',
  subBg:            '#F8FAFC',
  subBgHover:       '#EEF2FF',
  subTexto:         '#334155',
  subTextoHover:    '#2C1FF1',
  subBorde:         '#E2E8F0',
  subBordeHover:    '#2C1FF1',
  subPesoHover:     '700',
  btnBg:            '#2C1FF1',
  btnBgHover:       '#2517C8',
  flyoutTitulo:     '#1E293B',
  flyoutTituloBorde:'#EEF2FF',
};

const COLORES_OSCURO = {
  headerBg:         '#1A1527',
  headerTexto:      '#FFFFFF',
  headerSubtexto:   'rgba(255,255,255,0.5)',
  headerBorde:      'rgba(255,255,255,0.08)',
  panelBg:          '#1E1E2E',
  panelBorde:       '#2D2D3F',
  itemColor:        '#CBD5E1',
  itemColorSoft:    '#64748B',
  itemBgHover:      'rgba(255,255,255,0.05)',
  itemBgActivo:     'rgba(249,115,22,0.12)',
  itemBordeActivo:  '#F97316',
  itemColorActivo:  '#F97316',
  iconColor:        '#F97316',
  flyoutBg:         '#252535',
  flyoutBorde:      '#3A3A50',
  flyoutSombra:     '8px 8px 40px rgba(0,0,0,0.5)',
  subBg:            '#2D2D3F',
  subBgHover:       '#3A3A50',
  subTexto:         '#CBD5E1',
  subTextoHover:    '#F1F5F9',
  subBorde:         '#3A3A50',
  subBordeHover:    '#F97316',
  subPesoHover:     '700',
  btnBg:            '#F97316',
  btnBgHover:       '#EA580C',
  flyoutTitulo:     '#F1F5F9',
  flyoutTituloBorde:'rgba(249,115,22,0.25)',
};

/* ══════════════════════════════════════════════════════
   COMPONENTE SIDEBAR
   ══════════════════════════════════════════════════════ */
const Sidebar = ({ estaAbierto, onCerrar }) => {
  const [catActiva, setCatActiva] = useState(null);
  const navegar = useNavigate();
  const { esModoOscuro } = useTema();
  const hideTimer = useRef(null);

  const C = esModoOscuro ? COLORES_OSCURO : COLORES_CLARO;

  /* ── Restablecer al abrir ── */
  useEffect(() => {
    if (estaAbierto) setCatActiva(null);
  }, [estaAbierto]);

  /* ── Escape + bloqueo de scroll ── */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onCerrar(); };
    if (estaAbierto) {
      document.addEventListener('keydown', fn);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', fn);
      document.body.style.overflow = '';
    };
  }, [estaAbierto, onCerrar]);

  /* ── Gestión del flyout con delay ── */
  const mostrarFlyout = useCallback((id) => {
    clearTimeout(hideTimer.current);
    setCatActiva(id);
  }, []);

  const iniciarOcultamiento = useCallback(() => {
    hideTimer.current = setTimeout(() => setCatActiva(null), 130);
  }, []);

  const cancelarOcultamiento = useCallback(() => {
    clearTimeout(hideTimer.current);
  }, []);

  /* ── Navegación ── */
  const irA = useCallback((categoriaId, subcategoriaId = null) => {
    const url = subcategoriaId
      ? `/products?categoria=${categoriaId}&subcategoria=${subcategoriaId}`
      : `/products?categoria=${categoriaId}`;
    navegar(url);
    onCerrar();
  }, [navegar, onCerrar]);

  if (!estaAbierto) return null;

  const catData = categorias.find((c) => c.id === catActiva);

  return (
    <>
      {/* ── Overlay con blur ────────────────────────────── */}
      <div
        id="sidebar-overlay"
        aria-hidden="true"
        onClick={onCerrar}
        style={{
          position:        'fixed',
          inset:           0,
          zIndex:          40,
          background:      'rgba(0,0,0,0.48)',
          backdropFilter:  'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />

      {/* ── Panel izquierdo (lista de categorías) ──────── */}
      <aside
        id="sidebar-principal"
        role="dialog"
        aria-label="Menú de categorías"
        aria-modal="true"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          bottom:          0,
          zIndex:          50,
          width:           `${SIDEBAR_W}px`,
          display:         'flex',
          flexDirection:   'column',
          background:      C.panelBg,
          borderRight:     `1px solid ${C.panelBorde}`,
          boxShadow:       '4px 0 28px rgba(0,0,0,0.22)',
          overflow:        'hidden',
        }}
      >
        {/* Header azul / oscuro */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '0 18px',
          height:          `${HEADER_H}px`,
          background:      C.headerBg,
          borderBottom:    `1px solid ${C.headerBorde}`,
          flexShrink:      0,
        }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: '1rem', color: C.headerTexto, lineHeight: 1 }}>
              Categorías
            </p>
            <p style={{ fontSize: '0.72rem', color: C.headerSubtexto, marginTop: '3px' }}>
              Explora productos
            </p>
          </div>
          <button
            id="btn-cerrar-sidebar"
            aria-label="Cerrar menú"
            onClick={onCerrar}
            style={{
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              width:           '32px',
              height:          '32px',
              borderRadius:    '8px',
              background:      'transparent',
              border:          'none',
              cursor:          'pointer',
              color:           C.headerTexto,
              transition:      'background 150ms',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de categorías — con espaciado generoso */}
        <nav
          aria-label="Categorías disponibles"
          style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}
        >
          {categorias.map((cat) => {
            const esActiva = cat.id === catActiva;
            return (
              <button
                key={cat.id}
                id={`cat-nav-${cat.id}`}
                onClick={() => irA(cat.id)}
                onMouseEnter={(e) => {
                  mostrarFlyout(cat.id);
                  if (!esActiva) e.currentTarget.style.background = C.itemBgHover;
                }}
                onMouseLeave={(e) => {
                  iniciarOcultamiento();
                  if (!esActiva) e.currentTarget.style.background = 'transparent';
                }}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'space-between',
                  width:           '100%',
                  /* ← Más padding vertical para más aire entre ítems */
                  padding:         '14px 18px',
                  border:          'none',
                  cursor:          'pointer',
                  textAlign:       'left',
                  background:      esActiva ? C.itemBgActivo : 'transparent',
                  borderLeft:      `3px solid ${esActiva ? C.itemBordeActivo : 'transparent'}`,
                  transition:      'all 140ms',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                  <span style={{ color: esActiva ? C.itemColorActivo : C.iconColor, flexShrink: 0 }}>
                    {ICONOS[cat.id] ?? <Cpu size={20} />}
                  </span>
                  <span style={{
                    fontSize:   '0.9rem',
                    fontWeight: esActiva ? 700 : 500,
                    color:      esActiva ? C.itemColorActivo : C.itemColor,
                  }}>
                    {cat.nombre}
                  </span>
                </span>
                <ChevronRight
                  size={15}
                  style={{
                    color:     esActiva ? C.itemColorActivo : C.itemColorSoft,
                    flexShrink: 0,
                    transform: esActiva ? 'rotate(90deg)' : 'none',
                    transition: 'transform 150ms',
                  }}
                />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Flyout: mini-panel flotante de subcategorías ─ */}
      {/* Se posiciona A LA DERECHA del panel y DEBAJO del header */}
      {catData && (
        <div
          id="sidebar-flyout"
          role="region"
          aria-label={`Subcategorías de ${catData.nombre}`}
          onMouseEnter={cancelarOcultamiento}
          onMouseLeave={iniciarOcultamiento}
          style={{
            position:       'fixed',
            left:           `${SIDEBAR_W}px`,
            top:            `${HEADER_H}px`,   /* ← empieza debajo del header */
            zIndex:         51,
            width:          '340px',
            maxHeight:      `calc(100vh - ${HEADER_H}px)`,
            overflowY:      'auto',
            background:     C.flyoutBg,
            border:         `1px solid ${C.flyoutBorde}`,
            borderLeft:     'none',
            borderRadius:   '0 12px 12px 0',
            boxShadow:      C.flyoutSombra,
            padding:        '22px 20px',
          }}
        >
          {/* Título de la categoría activa */}
          <h2 style={{
            fontSize:      '1.05rem',
            fontWeight:    800,
            color:         C.flyoutTitulo,
            marginBottom:  '14px',
            paddingBottom: '12px',
            borderBottom:  `2px solid ${C.flyoutTituloBorde}`,
          }}>
            {catData.nombre}
          </h2>

          {/* Grid de subcategorías */}
          <div style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(2, 1fr)',
            gap:                   '8px',
            marginBottom:          '18px',
          }}>
            {catData.subcategorias.map((sub) => (
              <button
                key={sub.id}
                id={`subcat-${catData.id}-${sub.id}`}
                onClick={() => irA(catData.id, sub.id)}
                style={{
                  padding:      '10px 12px',
                  borderRadius: '8px',
                  border:       `1px solid ${C.subBorde}`,
                  background:   C.subBg,
                  color:        C.subTexto,
                  fontSize:     '0.83rem',
                  fontWeight:   500,
                  textAlign:    'left',
                  cursor:       'pointer',
                  transition:   'all 130ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background   = C.subBgHover;
                  e.currentTarget.style.borderColor  = C.subBordeHover;
                  e.currentTarget.style.color        = C.subTextoHover;
                  e.currentTarget.style.fontWeight   = C.subPesoHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background   = C.subBg;
                  e.currentTarget.style.borderColor  = C.subBorde;
                  e.currentTarget.style.color        = C.subTexto;
                  e.currentTarget.style.fontWeight   = '500';
                }}
              >
                {sub.nombre}
              </button>
            ))}
          </div>

          {/* CTA — ver toda la categoría */}
          <button
            onClick={() => irA(catData.id)}
            style={{
              width:        '100%',
              padding:      '11px',
              borderRadius: '10px',
              border:       'none',
              background:   C.btnBg,
              color:        '#FFFFFF',
              fontSize:     '0.875rem',
              fontWeight:   700,
              cursor:       'pointer',
              transition:   'background 150ms',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = C.btnBgHover}
            onMouseLeave={(e) => e.currentTarget.style.background = C.btnBg}
          >
            Ver todo en {catData.nombre}
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
