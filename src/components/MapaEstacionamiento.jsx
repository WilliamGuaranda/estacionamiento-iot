import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  useMap,
} from 'react-leaflet'
import { BOUNDS } from '../services/coordenadas'

// Componente auxiliar para ajustar los límites del mapa automáticamente
function FitBounds({ bounds, padding }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    // Pequeño retardo para asegurar que el contenedor tenga dimensiones
    const timeout = setTimeout(() => {
      map.fitBounds(bounds, { padding: padding || [20, 20] })
    }, 100)
    return () => clearTimeout(timeout)
  }, [map, bounds, padding])

  return null
}

export default function MapaEstacionamiento({ espacios = [] }) {
  // Límites generales del terreno
  const boundsTerreno = [
    [BOUNDS.norte, BOUNDS.oeste],
    [BOUNDS.sur, BOUNDS.este],
  ]

  // Centro inicial: enfocado en la parte superior de las columnas
  // (ligeramente desplazado hacia el norte y centrado en longitud)
  const centroSuperior = [
    BOUNDS.norte - 0.00001, // un poco más al norte para ver las primeras filas
    (BOUNDS.oeste + BOUNDS.este) / 2,
  ]

  // Filtra solo los espacios que tengan boundingBox definido
  const espaciosValidos = espacios.filter(
    (espacio) =>
      espacio?.ubicacion?.boundingBox?.norte !== undefined &&
      espacio?.ubicacion?.boundingBox?.sur !== undefined &&
      espacio?.ubicacion?.boundingBox?.oeste !== undefined &&
      espacio?.ubicacion?.boundingBox?.este !== undefined,
  )

  return (
    <MapContainer
      center={centroSuperior}
      zoom={18}  // puedes ajustar a 19 si quieres más detalle
      className="mapa-container"
      style={{ height: '100%', width: '100%' }}
    >
      {/* Ajusta la vista para que se vean todos los espacios (opcional) */}
      {/* Si solo quieres centrar la parte superior, comenta esta línea */}
      <FitBounds bounds={boundsTerreno} padding={[25, 25]} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {espaciosValidos.map((espacio) => {
        const { norte, sur, oeste, este } = espacio.ubicacion.boundingBox
        const posiciones = [
          [norte, oeste],
          [norte, este],
          [sur, este],
          [sur, oeste],
        ]

        const esLibre = espacio.estado === 'libre'
        const esOcupado = espacio.estado === 'ocupado'
        const color = esLibre ? '#10b981' : esOcupado ? '#f43f5e' : '#94a3b8'

        return (
          <Polygon
            key={espacio.id}
            positions={posiciones}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.6,
              weight: 1.2,
            }}
          >
            <Popup>
              <div style={{ padding: '4px', textAlign: 'center', minWidth: '120px' }}>
                <strong>{espacio.id}</strong>
                <br />
                Estado: <strong>{espacio.estado?.toUpperCase() || 'SIN INFO'}</strong>
                <br />
                Distancia: {espacio.distanciaDetectada} cm
              </div>
            </Popup>
          </Polygon>
        )
      })}
    </MapContainer>
  )
}