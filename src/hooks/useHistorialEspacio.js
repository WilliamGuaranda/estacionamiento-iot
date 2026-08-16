import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../services/firebase'

export function useHistorialEspacio(id) {
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return undefined

    const historialRef = ref(db, `historial/${id}`)
    const unsubscribe = onValue(
      historialRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const lista = Object.entries(data).map(([timestamp, value]) => ({
            timestamp: Number(timestamp),
            ...value,
          }))
          lista.sort((a, b) => a.timestamp - b.timestamp)
          setHistorial(lista)
        } else {
          setHistorial([])
        }
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [id])

  return { historial, loading, error }
}