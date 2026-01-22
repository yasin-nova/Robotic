import { useState } from "react"
import { levels } from "../data/levels"
import Robot from "./Robot"
import Habitat from "./Habitat"
import Animal from "./Animal"

export default function Board() {
  const [levelIndex, setLevelIndex] = useState(0)
  const level = levels[levelIndex]

  const [position, setPosition] = useState(level.startPosition)
  const [hasAnimal, setHasAnimal] = useState(false)
  const [message, setMessage] = useState(level.message)

  const resetLevel = () => {
    setPosition(level.startPosition)
    setHasAnimal(false)
    setMessage(level.message)
  }

  const move = (dx, dy) => {
    const newPos = { x: position.x + dx, y: position.y + dy }
    if (newPos.x < 0 || newPos.x > 2 || newPos.y < 0 || newPos.y > 2) return

    setPosition(newPos)

    if (
      !hasAnimal &&
      newPos.x === level.animalPosition.x &&
      newPos.y === level.animalPosition.y
    ) {
      setHasAnimal(true)
      setMessage("Aldın! Şimdi doğru alana götür")
    }

    if (hasAnimal) {
      if (
        level.correctHabitat === "ice" &&
        newPos.x === 0 && newPos.y === 1
      ) {
        setMessage("⭐ Harika! Seviye tamamlandı")
      }

      if (
        level.correctHabitat === "sea" &&
        newPos.x === 2 && newPos.y === 1
      ) {
        setMessage("⭐ Harika! Seviye tamamlandı")
      }
    }
  }

  const nextLevel = () => {
    setLevelIndex(i => (i + 1) % levels.length)
  }

  return (
    <>
      <h3>Seviye {level.id}</h3>
      <p>{message}</p>

      <div className="grid">
        {[0,1,2].map(y =>
          <div className="row" key={y}>
            {[0,1,2].map(x =>
              <div className="cell" key={x}>
                {position.x === x && position.y === y && <Robot />}
                {!hasAnimal &&
                  x === level.animalPosition.x &&
                  y === level.animalPosition.y &&
                  <Animal type={level.animal} />
                }
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

      <button onClick={nextLevel} style={{ marginTop: 10 }}>
        ➡️ Sonraki Seviye
      </button>
    </>
  )
}
