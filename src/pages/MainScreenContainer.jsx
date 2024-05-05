import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updatePlayerPosition } from "../playerUtils";
// Maps
import GreenLandUI from "../maps/GreenLandUI";
import Inventory from "../components/Inventory";
import { LevelContext } from "../context/level.context";



function MainScreen() {
  const direction = useRef({ x: 0, y: 0 }); // movement direction, useRef hook, to get current value inside my EventListener
  const [npcPosition, setNpcPosition] = useState({ x: 900, y: 600 });
  const [position, setPosition] = useState({ x: 0, y: 200 }); // player position on game screen
  const [frameIndex, setFrameIndex] = useState(0); // frame of player sprite sheet
  const [activeRow, setActiveRow] = useState(0); // i have one row of 4 sprites for every direction on the sprite sheet
  const [counter, setCounter] = useState(0); // to reduce speed of looping through sprite images inside game loop, updating sprite image every 5 loops
  const [gameOver, setGameOver] = useState(false);
  const animationID = useRef(null);
  const backgroundElement = useRef(null);
  const [backgroundPosition, setBackgroundPosition] = useState([0, 0]);
  const isScreenMoving = useRef(false); // Track if the screen is moving
  const [inventory, setInventory] = useState(false); // player inventory to store collected items
  const pressedKeys = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  }); // Keeping track of presse keys to display correct sprite
  const [spriteSize, setSpriteSize] = useState(32);
  const borders = useRef({
    bottom:
      window.innerHeight > 1024
        ? 1024 - spriteSize
        : window.innerHeight - spriteSize,
    right:
      window.innerWidth > 1792
        ? 1792 - spriteSize
        : window.innerWidth - spriteSize,
  });
  const { greenLandObjectCenterPositions,  inventoryItems} = useContext(LevelContext);
  // const initialObjectPositions = [{top: 100, left: 50, radius: 60}, {top: 400, left: 70, radius: 90}]; // object positions need to updated with reference to original positions
  // const objectCenterPositions = useRef([{top: 100, left: 50, radius: 60}, {top: 400, left: 70, radius: 90}]); // for collision detection
  // Loop Variables
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // check if there is a conversation with a NPC
  const [conv, setConv] = useState(false);
  
  const frameTime = 60 / 1000;

  const framesPerRow = 4; // Number of sprites in each row
 
  const navigate = useNavigate();

  // every iteration of game loop update function updates everything on screen (positions etc), looping through sprites
  const update = () => {
    updatePlayerPosition(direction, borders, spriteSize, backgroundElement, setBackgroundPosition, setPosition, isScreenMoving, greenLandObjectCenterPositions, setConv, setNpcPosition);
    
    //console.log(collided);
    animateSprite();
  };

  const animateSprite = () => {
    setCounter((prevCount) => {
      if (prevCount % 10 === 0) {
        if (direction.current.x !== 0 || direction.current.y !== 0) {
          setFrameIndex((prevIndex) => (prevIndex + 1) % 4);
        } else if (isScreenMoving.current === true) {
          setFrameIndex((prevIndex) => (prevIndex + 1) % 4);
        }
      }
      return prevCount + 1;
    });
  };
  // movement direction is checked to use the correct sprites
  const checkMovementDirection = () => {
    if (pressedKeys.current.up && pressedKeys.current.left) {
      return "left";
    } else if (pressedKeys.current.up && pressedKeys.current.right) {
      return "right";
    } else if (pressedKeys.current.down && pressedKeys.current.left) {
      return "left";
    } else if (pressedKeys.current.down && pressedKeys.current.right) {
      return "right";
    } else if (pressedKeys.current.up) {
      return "up";
    } else if (pressedKeys.current.down) {
      return "down";
    } else if (pressedKeys.current.left) {
      return "left";
    } else if (pressedKeys.current.right) {
      return "right";
    }
  };

  // Update movement boundaries

  const updateBoundaries = () => {
    borders.current.bottom =
      window.innerHeight > 1024
        ? 1024 - spriteSize
        : window.innerHeight - spriteSize; // border should never exeed image size
    borders.current.right =
      window.innerWidth > 1792
        ? 1792 - spriteSize
        : window.innerWidth - spriteSize;
    // Reload the page
    location.reload();
  };

  // game Loop, called recursively
  const gameLoop = (timestamp) => {
    if (gameOver === true) return;

    setLastTimestamp((previousTimestamp) => {
      if (!previousTimestamp) {
        return timestamp; // If lastTimestamp is not set, set it to current timestamp
      }

      const elapsedTime = timestamp - previousTimestamp; // Calculate elapsed time

      setAccumulatedTime((previousAcc) => {
        if (previousAcc >= frameTime) {
          update();
          return 0;
        }
        return previousAcc + elapsedTime;
      });

      return timestamp; // Update lastTimestamp with current timestamp
    });

    animationID.current = window.requestAnimationFrame(gameLoop);
  }; 

  // on the first loading of the DOM EventListeners are created, that watch arrow Keys for player movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
          direction.current.y = -3;
          pressedKeys.current.up = true;
          break;
        case "ArrowDown":
          direction.current.y = 3;
          pressedKeys.current.down = true;
          break;
        case "ArrowLeft":
          direction.current.x = -3;
          pressedKeys.current.left = true;
          break;
        case "ArrowRight":
          direction.current.x = 3;
          pressedKeys.current.right = true;
          break;
        case "q":
          setInventory((prev)=>{
            return !prev;
          } );
          break;
        default:
          break;
      }
      // Here I want to check which keys are pressed down after the latest Keydown event and accordingly switch rows in my sprite
      let spriteRow;
      spriteRow = checkMovementDirection();
      switch (spriteRow) {
        case "up":
          setActiveRow(2);
          break;
        case "down":
          setActiveRow(0);
          break;
        case "left":
          setActiveRow(3);
          break;
        case "right":
          setActiveRow(1);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "ArrowUp":
          direction.current.y = 0;
          pressedKeys.current.up = false;
          break;
        case "ArrowDown":
          direction.current.y = 0;
          pressedKeys.current.down = false;
          break;
        case "ArrowLeft":
          direction.current.x = 0;
          pressedKeys.current.left = false;
          break;
        case "ArrowRight":
          direction.current.x = 0;
          pressedKeys.current.right = false;
          break;
        default:
          break;
      }
      // Here I want to check which keys are pressed down after the latest KeyUp event and accordingly switch rows in my sprite
      let spriteRow;
      spriteRow = checkMovementDirection();
      switch (spriteRow) {
        case "up":
          setActiveRow(2);
          break;
        case "down":
          setActiveRow(0);
          break;
        case "left":
          setActiveRow(3);
          break;
        case "right":
          setActiveRow(1);
          break;
        default:
          break;
      }
    };
    gameLoop();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // event listener for window size is needed to change movement borders dynamically
    window.addEventListener("resize", updateBoundaries);

    // getting DOM element after it has mounted
    backgroundElement.current = document.getElementById("game-container");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, []); // Empty dependency array to run effect only once

  const frameX = (frameIndex % framesPerRow) * spriteSize; // frameX contains the number of pixels the sprite sheet needs to be moved so the next sprite becomes visible in a certian row
  const frameY = activeRow * spriteSize;

  // const logSomething = () => {
  //   console.log(counter)
  // }
  const endGame = () => {
    setGameOver(true);

    if (animationID.current) {
      window.cancelAnimationFrame(animationID.current);
    }

  };

  

  return (
   <GreenLandUI backgroundPosition={backgroundPosition} position={position} setPosition={setPosition} frameX={frameX} frameY={frameY} conversation={conv} setConverstaion={setConv} npcPosition={npcPosition} endGame={endGame} />
  );
}

export default MainScreen;
