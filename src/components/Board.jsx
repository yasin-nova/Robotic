import { useState } from "react"
import Robot from "./Robot"
import Habitat from "./Habitat"

export default function Board() {
  const [position, setPosition] = useState({ x: 1, y: 1 })

  const moveForward = () => {
    setPosition(p => ({ ...p, y: p.y - 1 }))
  }

  const moveLeft = () => {
    setPosition(p => ({ ...p, x: p.x - 1 }))
  }

  const moveRight = () => {
    setPosition(p => ({ ...p, x: p.x + 1 }))
  }

  return (
    <>
      <div className="grid">
        {[0,1,2].map(y =>
          <div className="row" key={y}>
            {[0,1,2].map(x =>
              <div className="cell" key={x}>
                {position.x === x && position.y === y && <Robot />}
                {x === 0 && y === 1 && <Habitat type="ice" label="Buz" />}
                {x === 2 && y === 1 && <Habitat type="sea" label="Deniz" />}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={moveLeft}>⬅️</button>
        <button onClick={moveForward}>⬆️</button>
        <button onClick={moveRight}>➡️</button>
      </div>
    </>
  )
}
