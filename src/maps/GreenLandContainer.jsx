import Player from "../components/Player";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LevelContext } from "../context/level.context";
import myAudioFile from "../assets/greenland-music.mp3";
import moonflower from "../assets/moonflower-inventory.png";
import GreenLandUI from "./GreenLandUI";

function GreenLand({
  backgroundPosition,
  position,
  setPosition,
  frameX,
  frameY,
  conversation,
  setConverstaion,
  npcPosition,
  endGame,
}) {
  const {
    greenLandInitialObjectPositions,
    greenLandObjectCenterPositions,
    inventoryItems,
  } = useContext(LevelContext);
  const navigate = useNavigate();
  // Keeping track of collected moonflowers
  const flowersCollected = useRef(0);
  // Add a reference to the audio element
  const audioRef = useRef(null);

  const moonflowerOneRef = useRef(null);
  const moonflowerTwoRef = useRef(null);
  const moonflowerThreeRef = useRef(null);
  const moonflowerFourRef = useRef(null);
  const moonflowerFiveRef = useRef(null);

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
      "I am looking for moonflowers for my village. Can you help me gather 5 more? Use (E) to collect a flower",
    questCompleted: "Thank you. Please come to my village to accept a small gift in return.",
  };

  // Function to check for collision between two elements
  function isColliding(rect1, rect2) {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  // Function to get the position and size of an element
  function getRect(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
    };
  }

  function handleSpecificKeys(event) {
    // Access the DOM element using the ref
    const moonflowerOneElement = moonflowerOneRef.current;
    const moonflowerTwoElement = moonflowerTwoRef.current;
    const moonflowerThreeElement = moonflowerThreeRef.current;
    const moonflowerFourElement = moonflowerFourRef.current;
    const moonflowerFiveElement = moonflowerFiveRef.current;
    const moonflowerElements = [
      moonflowerOneElement,
      moonflowerTwoElement,
      moonflowerThreeElement,
      moonflowerFourElement,
      moonflowerFiveElement,
    ];
    const moonFlowerRectangles = [];
    // Function to continuously check for collision
    function checkCollision(obstacles) {
      setPosition((prev) => {
        const playerRect = {
          top: prev.y,
          bottom: prev.y + 32,
          left: prev.x,
          right: prev.x + 32,
        };

        obstacles.forEach((el, index) => {
          if (isColliding(playerRect, el)) {
            // Handle collision here

            const currentFlower = moonflowerElements[index];
            currentFlower.style.display = "none";
            // increase number of collected moonflowers
            //!!!!!!!!!!!!!! for some reason this gets executed twice in my dev environment
            flowersCollected.current = flowersCollected.current + 1;
            // get flower id to rmeove the same object from the level context
            const flowerId = currentFlower.id;
            // also the objects need to be removed form the levelContext
            greenLandObjectCenterPositions.current.forEach((el, index) => {
              if (el.flower) {
                console.log(flowerId);
                if (el.flower === flowerId) {
                  greenLandInitialObjectPositions.current.splice(index, 1);
                  greenLandObjectCenterPositions.current.splice(index, 1);
                }
              }
            });
            // add collected flower to the inventory
            inventoryItems.current.push({ name: <img src={moonflower} /> });
          }
        });

        return prev;
      });
    }
    if (event.key === "e") {
      // Check if the ref is defined and the corresponding DOM element exists
      console.log(greenLandInitialObjectPositions.current);
      if (
        moonflowerOneElement &&
        moonflowerTwoElement &&
        moonflowerThreeElement &&
        moonflowerFourElement &&
        moonflowerFiveElement
      ) {
        moonflowerElements.forEach((el) => {
          moonFlowerRectangles.push(getRect(el));
        });

        checkCollision(moonFlowerRectangles);

        // Remove the DOM element
        // moonflowerOneElement.style.display = "none";
      }
    }
  }

  // Add useEffect to play audio when component mounts
  useEffect(() => {
    // Play the audio
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
  }, []);
  // need event listener here to check for collioions with flowers

  useEffect(() => {
    window.addEventListener("keydown", handleSpecificKeys);
    return () => {
      window.removeEventListener("keydown", handleSpecificKeys);
    };
  }, []);

  const levelOutro =  async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, speed * currentText.length + 5000);
    });
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.transition = "opacity 15s"
    gameContainer.style.opacity = "0";
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, speed * currentText.length + 3000);
    });
    navigate("/game-over")

  }

  function typeWriter() {
    if (index < currentText.length) {
      npcTextBox.innerHTML += currentText.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  const startConversation = async () => {
    try {
      if (!(flowersCollected.current > 4)) {
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
      } else {
        console.log("all flowers collected")
        currentText = npxText.questCompleted;
        typeWriter();
        endGame();
        levelOutro();
      }
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
    for (let i = 0; i < greenLandInitialObjectPositions.current.length; i++) {
      updatedPositions.push({
        ...greenLandInitialObjectPositions.current[i],
        top:
          greenLandInitialObjectPositions.current[i].top +
          backgroundPosition[1],
        left:
          greenLandInitialObjectPositions.current[i].left +
          backgroundPosition[0],
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
    <GreenLandUI  backgroundPosition={backgroundPosition} position={position} setPosition={setPosition} frameX={frameX} frameY={frameY} conversation={conversation} setConverstaion={setConverstaion} npcPosition={npcPosition} endGame={endGame}/>
  );
}

export default GreenLand;
