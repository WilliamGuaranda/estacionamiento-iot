import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <div className="inicio-hero">
      <div className="inicio-content">
        <span className="inicio-badge">
          Proyecto IoT · React + Firebase
        </span>
        <h1 className="inicio-title">
          Estacionamiento Inteligente UTEQ
        </h1>
        <p className="inicio-description">
          Monitoreo en tiempo real de 80 espacios de parqueadero mediante sensores simulados.
          Visualiza disponibilidad, historial y ubicación geográfica.
        </p>
        <div className="inicio-actions">
          <Link to="/estacionamiento" className="btn btn-primary">
            Ver estacionamiento
          </Link>
          <a href="#caracteristicas" className="btn btn-secondary">
            Características
          </a>
        </div>

        <div id="caracteristicas" className="inicio-features">
          {[
            { icono: '📡', titulo: 'Tiempo real', desc: 'Actualización automática desde Firebase RTDB.' },
            { icono: '🗺️', titulo: 'Geolocalización', desc: 'Mapa interactivo con coordenadas reales.' },
            { icono: '📊', titulo: 'Estadísticas', desc: 'Resumen de disponibilidad y ocupación.' },
            { icono: '🧠', titulo: 'Simulación', desc: 'Sensores virtuales cambian aleatoriamente.' },
          ].map((c, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{c.icono}</span>
              <h3 className="feature-title">{c.titulo}</h3>
              <p className="feature-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}