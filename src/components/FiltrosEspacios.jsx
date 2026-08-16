export default function FiltrosEspacios({
  filtroColumna,
  setFiltroColumna,
  filtroEstado,
  setFiltroEstado,
}) {
  return (
    <div className="filtros">
      <div className="filtro-group">
        <label className="filtro-label">Columna</label>
        <select
          value={filtroColumna}
          onChange={(e) => setFiltroColumna(e.target.value)}
          className="filtro-select"
        >
          <option value="todas">Todas</option>
          <option value="1">Columna 1</option>
          <option value="2">Columna 2</option>
          <option value="3">Columna 3</option>
          <option value="4">Columna 4</option>
        </select>
      </div>
      <div className="filtro-group">
        <label className="filtro-label">Estado</label>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="filtro-select"
        >
          <option value="todos">Todos</option>
          <option value="libre">Libre</option>
          <option value="ocupado">Ocupado</option>
          <option value="sin info">Sin información</option>
        </select>
      </div>
    </div>
  )
}