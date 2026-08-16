import EspacioCard from './EspacioCard'

const FILAS = 20
const COLUMNAS = 4

export default function CuadriculaEstacionamiento({
  espacios,
  filtroColumna,
  filtroEstado,
  onSeleccionar,
}) {
  const columnas = [1, 2, 3, 4]
  const filas = Array.from({ length: FILAS }, (_, i) => i + 1)

  const cumpleFiltros = (espacio) => {
    if (!espacio) return false
    const cumpleCol = filtroColumna === 'todas' || espacio.columna === Number(filtroColumna)
    const cumpleEst = filtroEstado === 'todos' || espacio.estado === filtroEstado
    return cumpleCol && cumpleEst
  }

  return (
    <div>
      <div className="cuadricula-header">
        {columnas.map((col) => (
          <div key={col} className="cuadricula-header-col">
            Columna {col}
          </div>
        ))}
      </div>

      <div className="cuadricula-grid">
        {filas.map((num) => (
          <div key={num} className="cuadricula-fila">
            {columnas.map((col) => {
              const id = `ESP-C${String(col).padStart(2, '0')}-${String(num).padStart(2, '0')}`
              const espacio = espacios.find((e) => e.id === id)
              const visible = cumpleFiltros(espacio)

              return visible ? (
                <EspacioCard key={id} espacio={espacio} onSelect={onSeleccionar} />
              ) : (
                <div key={id} className="espacio-placeholder">
                  Sin datos
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}