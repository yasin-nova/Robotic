export default function Habitat({ type, label }) {
  return (
    <div className={`habitat ${type}`}>
      {label}
    </div>
  )
}
