import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEspacios } from '../hooks/useEspacios'
import { inicializarEspacios, iniciarSimulacion } from '../services/simulacion'
import ResumenEstacionamiento from '../components/ResumenEstacionamiento'
import CuadriculaEstacionamiento from '../components/CuadriculaEstacionamiento'
import FiltrosEspacios from '../components/FiltrosEspacios'
import MapaEstacionamiento from '../components/MapaEstacionamiento'
import Loader from '../components/Loader'

export default function Estacionamiento() {
  const { espacios, loading } = useEspacios()
  const [filtroColumna, setFiltroColumna] = useState('todas')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && espacios.length === 0) {
      inicializarEspacios()
    }
  }, [loading, espacios.length])

  useEffect(() => {
    const detener = iniciarSimulacion(5000)
    return detener
  }, [])

  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((espacio) => {
      const cumpleCol = filtroColumna === 'todas' || espacio.columna === Number(filtroColumna)
      const cumpleEst = filtroEstado === 'todos' || espacio.estado === filtroEstado
      return cumpleCol && cumpleEst
    })
  }, [espacios, filtroColumna, filtroEstado])

  if (loading) return <Loader />

  return (
    <div className="container">
      <header className="page-header">
        <h1 className="page-title">Estacionamiento Inteligente</h1>
        <p className="page-subtitle">
          Monitoreo en tiempo real de los 80 espacios · UTEQ
        </p>
      </header>

      <ResumenEstacionamiento espacios={espacios} />

      <FiltrosEspacios
        filtroColumna={filtroColumna}
        setFiltroColumna={setFiltroColumna}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
      />

      {/* Leyenda */}
      <div className="leyenda">
        <span className="leyenda-item">
          <span className="leyenda-dot leyenda-dot-libre"></span> Libre
        </span>
        <span className="leyenda-item">
          <span className="leyenda-dot leyenda-dot-ocupado"></span> Ocupado
        </span>
        <span className="leyenda-item">
          <span className="leyenda-dot leyenda-dot-sin-info"></span> Sin información
        </span>
        <span className="leyenda-count">
          {espaciosFiltrados.length} mostrando
        </span>
      </div>

      {/* Mapa a ancho completo, debajo de los filtros/leyenda */}
      <div className="mapa-panel">
        <h2>Ubicación en el mapa</h2>
        <MapaEstacionamiento espacios={espaciosFiltrados} />
      </div>

      {/* Cuadrícula de espacios */}
      <CuadriculaEstacionamiento
        espacios={espacios}
        filtroColumna={filtroColumna}
        filtroEstado={filtroEstado}
        onSeleccionar={(id) => navigate(`/espacios/${id}`)}
      />
    </div>
  )
}