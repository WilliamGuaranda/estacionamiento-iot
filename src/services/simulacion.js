import { ref, get, update } from 'firebase/database'
import { db } from './firebase'
import { generarEspaciosIniciales } from './coordenadas'

export async function inicializarEspacios() {
  const espacios = generarEspaciosIniciales()
  const updates = {}
  const timestampInicial = Date.now()

  espacios.forEach((espacio) => {
    updates[`espacios/${espacio.id}`] = espacio
    updates[`historial/${espacio.id}/${timestampInicial}`] = {
      distanciaDetectada: espacio.distanciaDetectada,
      estado: espacio.estado,
      fechaHora: timestampInicial,
    }
  })

  await update(ref(db), updates)
}

export function iniciarSimulacion(intervaloMs = 5000) {
  let detenido = false

  const actualizar = async () => {
    if (detenido) return

    try {
      const snapshot = await get(ref(db, 'espacios'))
      const data = snapshot.val()
      if (!data) return

      const ids = Object.keys(data)
      const cantidad = Math.floor(Math.random() * 8) + 5
      const seleccionados = []
      const copiaIds = [...ids]

      for (let i = 0; i < cantidad && copiaIds.length > 0; i++) {
        const idx = Math.floor(Math.random() * copiaIds.length)
        seleccionados.push(copiaIds.splice(idx, 1)[0])
      }

      const updates = {}
      seleccionados.forEach((id) => {
        const esOcupado = Math.random() < 0.3
        const nuevaDistancia = esOcupado
          ? Math.floor(Math.random() * 40) + 10
          : Math.floor(Math.random() * 80) + 60
        const nuevoEstado = nuevaDistancia <= 50 ? 'ocupado' : 'libre'
        const timestamp = Date.now()

        updates[`espacios/${id}/distanciaDetectada`] = nuevaDistancia
        updates[`espacios/${id}/estado`] = nuevoEstado
        updates[`espacios/${id}/fechaHora`] = timestamp
        updates[`historial/${id}/${timestamp}`] = {
          distanciaDetectada: nuevaDistancia,
          estado: nuevoEstado,
          fechaHora: timestamp,
        }
      })

      await update(ref(db), updates)
    } catch (error) {
      console.error('Error en simulación:', error)
    }
  }

  const intervalId = setInterval(actualizar, intervaloMs)
  return () => {
    detenido = true
    clearInterval(intervalId)
  }
}