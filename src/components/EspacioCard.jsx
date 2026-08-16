import { Link } from 'react-router-dom'
import EstadoBadge from './EstadoBadge'

function formatearFecha(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function EspacioCard({ espacio, onSelect }) {
  if (!espacio) return null

  const claseEstado =
    espacio.estado === 'libre'
      ? 'espacio-card-libre'
      : espacio.estado === 'ocupado'
        ? 'espacio-card-ocupado'
        : 'espacio-card-sin-info'

  return (
    <Link
      to={`/espacios/${espacio.id}`}
      onClick={() => onSelect && onSelect(espacio.id)}
      className={`espacio-card ${claseEstado}`}
    >
      <div className="espacio-card-header">
        <div>
          <p className="espacio-id">{espacio.id}</p>
          <p className="espacio-sub">
            Col {espacio.columna} · N° {espacio.numero}
          </p>
        </div>
        <EstadoBadge estado={espacio.estado} />
      </div>
      <div className="espacio-card-body">
        <span className="espacio-distancia">
          {espacio.distanciaDetectada?.toFixed(1)} cm
        </span>
        <span className="espacio-fecha">
          {formatearFecha(espacio.fechaHora)}
        </span>
      </div>
    </Link>
  )
}