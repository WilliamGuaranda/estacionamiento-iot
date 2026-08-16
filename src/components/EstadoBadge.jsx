export default function EstadoBadge({ estado }) {
  const clase =
    estado === 'libre'
      ? 'badge badge-libre'
      : estado === 'ocupado'
        ? 'badge badge-ocupado'
        : 'badge badge-sin-info'

  return (
    <span className={clase}>
      {estado || 'sin info'}
    </span>
  )
}