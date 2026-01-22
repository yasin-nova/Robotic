import Robot from "./Robot"
import Habitat from "./Habitat"

export default function Board() {
  return (
    <div className="board">
      <Habitat type="ice" label="Buz Alanı" />
      <Robot />
      <Habitat type="sea" label="Deniz Alanı" />
    </div>
  )
}
