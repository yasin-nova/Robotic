export default function Animal({ type }) {
  const emoji = type === "polar" ? "🐻‍❄️" : "🐟"

  return (
    <div className="animal">
      {emoji}
    </div>
  )
}
