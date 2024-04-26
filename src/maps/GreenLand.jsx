import Player from "../components/Player";
import { useState, useEffect, useRef, useContext } from "react";
import { LevelContext } from "../context/level.context";
import myAudioFile from "../assets/greenland-music.mp3"

function GreenLand({
  backgroundPosition,
  position,
  frameX,
  frameY,
  conversation,
  setConverstaion,
  npcPosition,
}) {
  const { greenLandInitialObjectPositions, greenLandObjectCenterPositions } =
    useContext(LevelContext);
    const [isPlaying, setIsPlaying] = useState(true);

  // conversation variables
  let index = 0;
  const speed = 100; // Adjust typing speed here
  const npcTextBox = document.getElementById("greenland-npc"); // DOM Element for displaying what the NPC is saying
  const npcElement = document.getElementById("green-land-woman");
  const flowerElements = document.querySelectorAll(".moonflower");
  let currentText;
  const npxText = {
    firstSentence: "Hello Stranger. I saw you coming this way.",
    secondSentence:
      "I am looking for moonflowers for my village. Can you help me gather 5 more?",
  };

  function typeWriter() {
    if (index < currentText.length) {
      npcTextBox.innerHTML += currentText.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  const startConversation = async () => {
    try {
      currentText = npxText.firstSentence;
      typeWriter();
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, speed * currentText.length + 2000);
      });
      npcTextBox.innerHTML = "";
      currentText = npxText.secondSentence;
      index = 0;
      typeWriter();
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, speed * currentText.length + 2000);
      });
      npcTextBox.innerHTML = "";
      npcTextBox.style.display = "none";
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, speed * currentText.length + 6000);
      });
      setConverstaion(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (conversation === true) {
      npcTextBox.style.display = "block";
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

    //also NPC characters Position and Textbox and moonflowers need to be updated on the screen
    if (npcElement && npcTextBox && flowerElements) {
      // Calculate the updated NPC position
      const npcTop = backgroundPosition[1] + 600;
      const npcLeft = backgroundPosition[0] + 900;
      // textbox
      const npcTopText = backgroundPosition[1] + 500;
      const npcLeftText = backgroundPosition[0] + 900;

      // Apply updated position using CSS transitions
      npcElement.style.transition = "top 0.1s, left 0.1s"; // same transition duration as for the game container/ background image
      npcElement.style.top = `${npcTop}px`;
      npcElement.style.left = `${npcLeft}px`;

      npcTextBox.style.transition = "top 0.1s, left 0.1s"; // same transition duration as for the game container/ background image
      npcTextBox.style.top = `${npcTopText}px`;
      npcTextBox.style.left = `${npcLeftText}px`;

      // Updating moonflower positions on screen
      const initialPosition = [
        { top: 80, left: 150, radius: 35, flower: true },
        { top: 20, left: 850, radius: 35, flower: true },
        { top: 420, left: 850, radius: 35, flower: true },
        { top: 720, left: 150, radius: 35, flower: true },
        { top: 820, left: 1650, radius: 35, flower: true },
      ];
      let index = 0;
      flowerElements.forEach((element) => {
        element.style.transition = "top 0.1s, left 0.1s";
        let newTop = backgroundPosition[1] + initialPosition[index].top;
        let newLeft = backgroundPosition[0] + initialPosition[index].left;
        element.style.top = `${newTop}px`;
        element.style.left = `${newLeft}px`;
        index++;
      });
    }
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
        <p
          id="greenland-npc"
          style={{
            position: "absolute",
            padding: "5px",
            top: 500,
            left: 900,
            border: "solid rgb(64, 38, 21) ",
            borderStyle: "double",
            width: "200px",
            display: "none",
            color: "white",
            textShadow: "2px 2px blue",
          }}
        ></p>
      </div>
      <div
        className="moonflower"
        style={{ position: "absolute", top: 80, left: 150 }}
      ></div>
      <div
        className="moonflower"
        style={{ position: "absolute", top: 20, left: 850 }}
      ></div>
      <div
        className="moonflower"
        style={{ position: "absolute", top: 420, left: 850 }}
      ></div>
      <div
        className="moonflower"
        style={{ position: "absolute", top: 720, left: 150 }}
      ></div>
      <div
        className="moonflower"
        style={{ position: "absolute", top: 820, left: 1650 }}
      ></div>
      <audio>
                <source src={myAudioFile} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
    </div>
  );
}

export default GreenLand;
