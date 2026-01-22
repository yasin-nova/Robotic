import { useState } from "react"
import Robot from "./Robot"
import Habitat from "./Habitat"
import Animal from "./Animal"

export default function Board() {
  const [position, setPosition] = useState({ x: 1, y: 2 })
  const [hasAnimal, setHasAnimal] = useState(false)
  const [message, setMessage] = useState("Hayvanı al ve doğru alana götür")

  const animalPosition = { x: 1, y: 1 }

  const move = (dx, dy) => {
    const newPos = { x: position.x + dx, y: position.y + dy }
    if (newPos.x < 0 || newPos.x > 2 || newPos.y < 0 || newPos.y > 2) return

    setPosition(newPos)

    if (
      newPos.x === animalPosition.x &&
      newPos.y === animalPosition.y &&
      !hasAnimal
    ) {
      setHasAnimal(true)
      setMessage("Harika! Şimdi doğru yaşam alanına götür")
    }

    if (hasAnimal && newPos.x === 0 && newPos.y === 1) {
      setMessage("⭐ Doğru! Buz alanı")
    }

    if (hasAnimal && newPos.x === 2 && newPos.y === 1) {
      setMessage("❌ Yanlış! Bu deniz alanı")
    }
  }

  return (
    <>
      <p>{message}</p>

      <div className="grid">
        {[0,1,2].map(y =>
          <div className="row" key={y}>
            {[0,1,2].map(x =>
              <div className="cell" key={x}>
                {position.x === x && position.y === y && <Robot />}
                {!hasAnimal && x === 1 && y === 1 && <Animal type="polar" />}
                {x === 0 && y === 1 && <Habitat type="ice" label="Buz" />}
                {x === 2 && y === 1 && <Habitat type="sea" label="Deniz" />}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={() => move(-1,0)}>⬅️</button>
        <button onClick={() => move(0,-1)}>⬆️</button>
        <button onClick={() => move(1,0)}>➡️</button>
      </div>
    </>
  )
}
