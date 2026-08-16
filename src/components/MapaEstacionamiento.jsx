import { MapContainer, TileLayer, Rectangle, CircleMarker, Popup } from 'react-leaflet'
import { BOUNDS } from '../services/coordenadas'

export default function MapaEstacionamiento({ espacios }) {
  const center = [(BOUNDS.norte + BOUNDS.sur) / 2, (BOUNDS.oeste + BOUNDS.este) / 2]
  const bounds = [
    [BOUNDS.norte, BOUNDS.oeste],
    [BOUNDS.sur, BOUNDS.este],
  ]

  return (
    <MapContainer
      center={center}
      zoom={18}
      className="mapa-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Rectangle
        bounds={bounds}
        pathOptions={{ color: '#6366f1', weight: 2, fillOpacity: 0.05 }}
      />
      {espacios.map((espacio) => {
        const color =
          espacio.estado === 'ocupado' ? '#f43f5e' : espacio.estado === 'libre' ? '#10b981' : '#94a3b8'
        return (
          <CircleMarker
            key={espacio.id}
            center={[espacio.ubicacion.latitud, espacio.ubicacion.longitud]}
            radius={4}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
          >
            <Popup>
              <strong>{espacio.id}</strong>
              <br />
              Estado: {espacio.estado}
              <br />
              Distancia: {espacio.distanciaDetectada} cm
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}