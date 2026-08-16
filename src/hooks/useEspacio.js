import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../services/firebase'

export function useEspacios() {
  const [espacios, setEspacios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const espaciosRef = ref(db, 'espacios')
    const unsubscribe = onValue(
      espaciosRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const lista = Object.values(data)
          lista.sort((a, b) => a.columna - b.columna || a.numero - b.numero)
          setEspacios(lista)
        } else {
          setEspacios([])
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
  }, [])

  return { espacios, loading, error }
}