import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts'
import { useHistorialEspacio } from '../hooks/useHistorialEspacio'
import EstadoBadge from './EstadoBadge'

const formatearHora = (ts) =>
  new Date(ts).toLocaleString('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

export default function HistorialEspacio({ id }) {
  const { historial, loading } = useHistorialEspacio(id)

  if (loading) return <div className="loader">Cargando historial…</div>
  if (historial.length === 0)
    return <p className="historial-empty">No hay historial registrado.</p>

  const datosGrafico = historial.map((h) => ({
    tiempo: formatearHora(h.timestamp),
    distancia: h.distanciaDetectada,
    estado: h.estado,
  }))

  return (
    <div className="historial-section">
      <div className="historial-graph">
        <h3>Gráfico de distancia</h3>
        <div className="historial-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" />
              <XAxis dataKey="tiempo" tick={{ fontSize: 10 }} />
              <YAxis
                label={{ value: 'cm', angle: -90, position: 'insideLeft', fontSize: 10 }}
              />
              <Tooltip />
              <Legend />
              <ReferenceLine
                y={50}
                stroke="#f43f5e"
                strokeDasharray="3 3"
                label={{ value: 'Umbral 50cm', position: 'insideTopRight', fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey="distancia"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="historial-table">
        <h3>Registro de cambios</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Distancia (cm)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {historial
              .slice()
              .reverse()
              .map((h) => (
                <tr key={h.timestamp}>
                  <td>{formatearHora(h.timestamp)}</td>
                  <td className="mono">{h.distanciaDetectada.toFixed(1)}</td>
                  <td>
                    <EstadoBadge estado={h.estado} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}