import { Link } from "react-router-dom"

function StartScreen() {
  return (
    <div><h2>
        Start Screen
    </h2>
    <Link to="/game">Start Game</Link>
    </div>
  )
}

export default StartScreen