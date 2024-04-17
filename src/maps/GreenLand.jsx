import Player from "../components/Player";
import { useState, useEffect, useRef, useContext } from "react";
import { LevelContext } from "../context/level.context";

function GreenLand({ backgroundPosition, position, frameX, frameY }) {
  
  const { greenLandInitialObjectPositions, greenLandObjectCenterPositions } = useContext(LevelContext);

  // update positions of objects when screen srolls
  useEffect(() => {
    let updatedPositions = [];
    for(let i = 0; i < greenLandInitialObjectPositions.length; i++) {
      updatedPositions.push({
        top: greenLandInitialObjectPositions[i].top + backgroundPosition[1],
        left: greenLandInitialObjectPositions[i].left + backgroundPosition[0],
        radius: greenLandInitialObjectPositions[i].radius
      })

    }

    greenLandObjectCenterPositions.current = updatedPositions;

      
  
  }, [backgroundPosition]);
  return (
    <div
      id="game-container"
      style={{
        backgroundPosition: `${backgroundPosition[0]}px ${backgroundPosition[1]}px`,
        transition: "background-position 0.1s",
      }}
    >
      
      <Player position={position} frameX={frameX} frameY={frameY} />
      <div id="green-land-woman" style={{
          position: "absolute",
          top: 600,
          left: 900,
          backgroundPosition: `-${0}px -${0}px`
        }}>
      </div>
    </div>
  );
}

export default GreenLand;