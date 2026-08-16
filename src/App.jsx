import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Estacionamiento from './pages/Estacionamiento'
import DetalleEspacio from './pages/DetalleEspacio'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/estacionamiento" element={<Estacionamiento />} />
            <Route path="/espacios/:id" element={<DetalleEspacio />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}