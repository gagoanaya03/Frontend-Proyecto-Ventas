// homeService.js — servicio de banners, retorna mock hasta conectar backend


export const obtenerBanners = async () => {
  try {
    return [
      {
        id: 1,
        titulo: 'Lo mejor en periféricos gaming',
        subtitulo: 'Teclados, mouses y headsets de alta gama',
        imagen: 'https://images.unsplash.com/photo-1593640408182-31c228c8b0da?w=1200&q=80',
        enlace: '/products?categoria=perifericos',
      },
      {
        id: 2,
        titulo: 'Monitores para cada necesidad',
        subtitulo: '4K, curvo, gaming y oficina',
        imagen: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80',
        enlace: '/products?categoria=monitores',
      },
      {
        id: 3,
        titulo: 'Almacenamiento ultrarrápido',
        subtitulo: 'SSD NVMe con velocidades de hasta 7300 MB/s',
        imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&q=80',
        enlace: '/products?categoria=almacenamiento',
      },
    ]
  } catch (err) {
    throw new Error(err.message) // propaga el error para que HomePage lo maneje
  }
}
