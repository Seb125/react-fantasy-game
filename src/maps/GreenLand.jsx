import Player from "../components/Player";
import { useState, useEffect, useRef, useContext } from "react";
import { LevelContext } from "../context/level.context";

function GreenLand({
  backgroundPosition,
  position,
  frameX,
  frameY,
  conversation,
}) {
  const { greenLandInitialObjectPositions, greenLandObjectCenterPositions } =
    useContext(LevelContext);
  
  // conversation variables
  let index = 0;
  const speed = 100; // Adjust typing speed here
  const npcElemment = document.getElementById("greenland-npc"); // DOM Element for displaying what the NPC is saying
  let npxText = "Hello Stranger. I saw you coming this way."

  function typeWriter() {
    if (index < npxText.length) {
      npcElemment.innerHTML += npxText.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  


  const startConversation = async () => {
    try {
      typeWriter();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (conversation === true) {
      npcElemment.style.display = "block";
      startConversation();
    }
  }, [conversation]);
  // update positions of objects when screen srolls
  useEffect(() => {
    let updatedPositions = [];
    for (let i = 0; i < greenLandInitialObjectPositions.length; i++) {
      updatedPositions.push({
        ...greenLandInitialObjectPositions[i],
        top: greenLandInitialObjectPositions[i].top + backgroundPosition[1],
        left: greenLandInitialObjectPositions[i].left + backgroundPosition[0],
      });
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
      <div
        id="green-land-woman"
        style={{
          position: "absolute",
          top: 600,
          left: 900,
          backgroundPosition: `-${0}px -${0}px`,
        }}
      ></div>
      <div>
        <p id="greenland-npc" style={{ position: "absolute", padding: "5px", top: 500, left: 900, border:"solid rgb(64, 38, 21) ", borderStyle:"double", width: "200px", display:"none", color:"white", textShadow: "2px 2px blue" }}></p>
      </div>
    </div>
  );
}

export default GreenLand;
