export const BOUNDS = {
  norte: -1.0122617572453996,
  sur: -1.012570971500396,
  oeste: -79.4682998912032,
  este: -79.46746240847104,
}

export const COLUMNAS = 4
export const FILAS = 20

export function generarEspaciosIniciales() {
  const espacios = []
  const latStep = (BOUNDS.norte - BOUNDS.sur) / COLUMNAS
  const lonStep = (BOUNDS.este - BOUNDS.oeste) / FILAS

  for (let c = 0; c < COLUMNAS; c++) {
    const norte = BOUNDS.norte - latStep * c
    const sur = BOUNDS.norte - latStep * (c + 1)

    for (let f = 0; f < FILAS; f++) {
      const oeste = BOUNDS.oeste + lonStep * f
      const este = BOUNDS.oeste + lonStep * (f + 1)

      const columna = c + 1
      const numero = f + 1
      const id = `ESP-C${String(columna).padStart(2, '0')}-${String(numero).padStart(2, '0')}`

      const esOcupado = Math.random() < 0.35
      const distanciaDetectada = esOcupado
        ? Math.floor(Math.random() * 40) + 10
        : Math.floor(Math.random() * 80) + 60
      const estado = distanciaDetectada <= 50 ? 'ocupado' : 'libre'

      espacios.push({
        id,
        columna,
        numero,
        distanciaDetectada,
        estado,
        fechaHora: Date.now(),
        ubicacion: {
          nombre: 'Parqueadero UTEQ',
          latitud: (norte + sur) / 2,
          longitud: (oeste + este) / 2,
          boundingBox: { norte, sur, oeste, este },
        },
      })
    }
  }
  return espacios
}