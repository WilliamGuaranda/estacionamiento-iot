export default function ResumenEstacionamiento({ espacios }) {
  const total = espacios.length
  const libres = espacios.filter((e) => e.estado === 'libre').length
  const ocupados = espacios.filter((e) => e.estado === 'ocupado').length
  const porcentajeDisponible = total > 0 ? ((libres / total) * 100).toFixed(1) : 0

  const cards = [
    { titulo: 'Total de espacios', valor: total, icono: '🚗', grad: 'from-slate-500 to-slate-700' },
    { titulo: 'Espacios libres', valor: libres, icono: '✅', grad: 'from-emerald-500 to-emerald-700' },
    { titulo: 'Espacios ocupados', valor: ocupados, icono: '⛔', grad: 'from-rose-500 to-rose-700' },
    { titulo: 'Disponibilidad', valor: `${porcentajeDisponible}%`, icono: '📊', grad: 'from-indigo-500 to-indigo-700' },
  ]

  return (
    <div className="resumen-grid">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="resumen-card"
        >
          <div className="resumen-card-content">
            <span className="resumen-icon">{card.icono}</span>
            <span className="resumen-value">{card.valor}</span>
          </div>
          <p className="resumen-title">{card.titulo}</p>
          {idx === 3 && (
            <div className="resumen-bar">
              <div
                className="resumen-bar-fill"
                style={{ width: `${porcentajeDisponible}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}