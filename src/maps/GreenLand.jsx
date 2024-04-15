import Player from "../components/Player";

function GreenLand({backgroundPosition, position, frameX, frameY}) {
  return (
    <div
      id="game-container"
      style={{
        backgroundPosition: backgroundPosition,
        transition: "background-position 0.1s",
      }}
    >
    <div id="rockOne" style={{
          position: "absolute",
          top: "50px",
          left: "50px",
          width: "1000px",
          height: "500px",
          zIndex: 100

        }}></div>
    <Player position={position} frameX={frameX} frameY={frameY} />
    </div>
  )
}

export default GreenLand