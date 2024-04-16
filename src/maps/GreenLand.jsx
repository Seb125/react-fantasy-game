import Player from "../components/Player";
import { useState, useEffect, useRef } from "react";


function GreenLand({ backgroundPosition, position, frameX, frameY }) {
const [rockCenterPositions, setRockCenterPositions] = useState({one: {top: 100, left: 50, radius: 60}}) // center (top left) of all rocks are saved and updated here
const [bgPosition, setBgPosition] = useState([0, 0]) // need to track background position as numeric values to adjust positions of all objects on the map

useEffect(() => {
  const [currentX, currentY] = backgroundPosition.split(" ");
  const currentXValue = parseInt(currentX, 10);
  const currentYValue = parseInt(currentY, 10);

  setBgPosition([currentXValue, currentYValue]);
  console.log(rockCenterPositions.one.top)
}, [backgroundPosition])
  return (
    <div
      id="game-container"
      style={{
        backgroundPosition: backgroundPosition,
        transition: "background-position 0.1s",
      }}
    >
      
      <Player position={position} frameX={frameX} frameY={frameY} />
    </div>
  );
}

export default GreenLand;