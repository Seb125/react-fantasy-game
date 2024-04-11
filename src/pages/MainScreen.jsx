import Player from "../components/Player";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



function MainScreen() {
  const direction = useRef({ x: 0, y: 0 }); // movement direction, useRef hook, to get current value inside my EventListener
  const [position, setPosition] = useState({ x: 0, y: 0 }); // player position on game screen
  const [frameIndex, setFrameIndex] = useState(0); // frame of player sprite sheet
  const [activeRow, setActiveRow] = useState(0); // i have one row of 4 sprites for every direction on the sprite sheet
  const [counter, setCounter] = useState(0); // to reduce speed of looping through sprite images inside game loop, updating sprite image every 5 loops
  const [gameOver, setGameOver] = useState(false);
  const animationID = useRef(null);
  const backgroundElement = useRef(null);

  const navigate = useNavigate();


  // every iteration of game loop update function updates everything on screen (positions etc), looping through sprites
  const update = () => {
    setPosition((previousPosition) => {
      if (
      
        previousPosition.x >= window.innerWidth - spriteSize || // Right border
        
        previousPosition.y >= window.innerHeight - spriteSize // Bottom border
      ) {
        
         // Get current background position
      const currentBackgroundPosition = backgroundElement.current.style.backgroundPosition;
      console.log(currentBackgroundPosition)

      const [currentX, currentY] = currentBackgroundPosition.split(" ");
      const currentXValue = parseInt(currentX, 10);
      const currentYValue = parseInt(currentY, 10);
  
      // Subtract 10 from current background position
      const newX = currentXValue - 10;
      const newY = currentYValue - 10;
      
  
      // Update background position
      
        backgroundElement.current.style.backgroundPosition = `${newX}px ${newY}px`;
      }
      const newPosition = {
      x: previousPosition.x + direction.current.x,
      y: previousPosition.y + direction.current.y
      }
      return newPosition;
  });
    
    animateSprite();
  };

  const animateSprite = () => {
    if(direction.current.x !== 0 || direction.current.y !== 0 ) {
      
      setCounter((prevCount) => {
        if (prevCount % 10 === 0) {
          setFrameIndex((prevIndex) => (prevIndex + 1) % 4);
        }
        return prevCount +1;
      });
    }
  };

  // game Loop, called recursively
  const gameLoop = () => {
    if (gameOver === true) return;

    update();

    animationID.current = window.requestAnimationFrame(() => gameLoop());
  };

  // on the first loading of the DOM EventListeners are created, that watch arrow Keys for player movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
          direction.current.y = -1;
          setActiveRow(2);
          break;
        case "ArrowDown":
          direction.current.y = 1;
          setActiveRow(0);
          break;
        case "ArrowLeft":
          direction.current.x = -1;
          setActiveRow(3);
          break;
        case "ArrowRight":
          direction.current.x = 1;
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
          break;
        case "ArrowDown":
          direction.current.y = 0;
          break;
        case "ArrowLeft":
          direction.current.x = 0;
          break;
        case "ArrowRight":
          direction.current.x = 0;
          break;
        default:
          break;
      }
    };
    gameLoop();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // getting DOM element after it has mounted
    backgroundElement.current = document.getElementById("game-container");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, []); // Empty dependency array to run effect only once

  const spriteSize = 32; // Size of each sprite (assuming 32x32)
  const framesPerRow = 4; // Number of sprites in each row

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

    // Redirect to Game Over Screen
    navigate("/game-over")
    }

  
  return (
    <div id="game-container" >
      <button onClick={endGame}>EndGame</button>
      <Player position={position} frameX={frameX} frameY={frameY} />
    </div>
  );
}

export default MainScreen;
