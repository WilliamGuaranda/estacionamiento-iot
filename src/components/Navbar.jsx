import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link'

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🅿️</span>
          <span className="navbar-logo-text">SmartParking UTEQ</span>
        </Link>
        <div className="navbar-links">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/estacionamiento" className={navLinkClass}>
            Estacionamiento
          </NavLink>
        </div>
      </div>
    </nav>
  )
}