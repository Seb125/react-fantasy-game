import Player from "../components/Player";
import { useState, useEffect, useRef, useContext } from "react";
import { LevelContext } from "../context/level.context";

function GreenLand({ backgroundPosition, position, frameX, frameY }) {
  
  const { greenLandInitialObjectPositions, greenLandObjectCenterPositions, textBox } = useContext(LevelContext);

  const text = "Hello Stranger";
  let index = 0;
  const speed = 100; // Adjust typing speed here

  function typeWriter() {
    if (index < text.length) {
      document.getElementById("typing-text").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  useEffect(() => {
    if(textBox === true) 
    {
      document.getElementById("typing-text").style.backgroundColor = "green";
      typeWriter();
    }
      
  }, [textBox])
  // update positions of objects when screen srolls
  useEffect(() => {
    let updatedPositions = [];
    for(let i = 0; i < greenLandInitialObjectPositions.length; i++) {
      updatedPositions.push({
        ...greenLandInitialObjectPositions[i],
        top: greenLandInitialObjectPositions[i].top + backgroundPosition[1],
        left: greenLandInitialObjectPositions[i].left + backgroundPosition[0]
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
      <div style={{position:"absolute", top: 500, left: 900}}>
        <p id="typing-text"></p>
      </div>
    </div>
  );
}

export default GreenLand;