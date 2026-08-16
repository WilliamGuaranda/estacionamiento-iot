import { useParams, Link } from 'react-router-dom'
import { useEspacios } from '../hooks/useEspacios'
import HistorialEspacio from '../components/HistorialEspacio'
import EstadoBadge from '../components/EstadoBadge'
import Loader from '../components/Loader'
import MapaEstacionamiento from '../components/MapaEstacionamiento'

function formatearFecha(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('es-EC', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function DetalleEspacio() {
  const { id } = useParams()
  const { espacios, loading: loadingEspacios } = useEspacios()
  const espacio = espacios.find((e) => e.id === id)

  if (loadingEspacios) return <Loader />
  if (!espacio) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>
        <p className="detalle-id">Espacio no encontrado</p>
        <Link to="/estacionamiento" className="back-link" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Volver al estacionamiento
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to="/estacionamiento" className="back-link">
        ← Volver al estacionamiento
      </Link>

      <div className="detalle-grid">
        <div className="detalle-card">
          <div className="detalle-header">
            <div>
              <h1 className="detalle-id">{espacio.id}</h1>
              <p className="detalle-sub">
                Columna {espacio.columna} · Número {espacio.numero}
              </p>
            </div>
            <EstadoBadge estado={espacio.estado} />
          </div>

          <dl className="detalle-dl">
            <div>
              <dt>Distancia detectada</dt>
              <dd className="mono">{espacio.distanciaDetectada?.toFixed(1)} cm</dd>
            </div>
            <div>
              <dt>Última actualización</dt>
              <dd>{formatearFecha(espacio.fechaHora)}</dd>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <dt>Ubicación</dt>
              <dd>{espacio.ubicacion?.nombre}</dd>
              <dd className="mono">
                Lat: {espacio.ubicacion?.latitud.toFixed(6)} · Lon:{' '}
                {espacio.ubicacion?.longitud.toFixed(6)}
              </dd>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <dt>Bounding Box</dt>
              <dd className="mono">
                N: {espacio.ubicacion?.boundingBox?.norte.toFixed(6)} · S:{' '}
                {espacio.ubicacion?.boundingBox?.sur.toFixed(6)}
                <br />
                O: {espacio.ubicacion?.boundingBox?.oeste.toFixed(6)} · E:{' '}
                {espacio.ubicacion?.boundingBox?.este.toFixed(6)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mapa-panel">
          <h2>Ubicación en el mapa</h2>
          <MapaEstacionamiento espacios={[espacio]} />
        </div>
      </div>

      <HistorialEspacio id={espacio.id} />
    </div>
  )
}