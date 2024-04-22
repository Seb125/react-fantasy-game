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
  const [playerInput, setPlayerInput] = useState("");
  // conversation variables
  let index = 0;
  const speed = 100; // Adjust typing speed here
  const npcElemment = document.getElementById("typing-text"); // DOM Element for displaying what the NPC is saying
  const playerElement = document.getElementById("player-text");
  let npxText;

  function typeWriter() {
    if (index < npxText.length) {
      npcElemment.innerHTML += npxText.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else{
      return "done";
    }
  }
  


  const startConversation = async () => {
    try {
      const response = await fetch("http://localhost:5005/conversation", {
        method: "GET",
      });
      const parsedText = await response.json();
      npxText = parsedText.message;
      npcElemment.style.backgroundColor = "rgb(150, 150, 150)";
      npcElemment.style.padding = "10px";
      npcElemment.style.borderRadius = "20px";
      playerElement.style.display = "block";
      typeWriter();
      const npcDone = await new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, speed*npxText.length);
      });
      console.log(npcDone)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (conversation === true) {
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
      <div style={{ position: "absolute", top: 500, left: 900 }}>
        <p id="typing-text"></p>
      </div>
      <div style={{ position: "absolute", top: position.y - 50, left: position.x, borderRadius: "20px", padding:"10px" }}>
        <input id="player-text" type="text" style={{display:"none"}} value={playerInput} onChange={(e) => setPlayerInput(e.target.value)}></input>
      </div>
    </div>
  );
}

export default GreenLand;
