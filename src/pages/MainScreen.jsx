import Test from "../components/Test";
import { useState, useEffect, useRef } from "react";

function MainScreen() {
  const direction = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [frameIndex, setFrameIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [counter, setCounter] = useState(0);

  const update = () => {
    setPosition((previousPosition) => ({
      x: previousPosition.x + direction.current.x,
      y: previousPosition.y + direction.current.y,
    }));
    animateSprite();
  };

  const animateSprite = () => {
    if(direction.current.x !== 0 || direction.current.y !== 0 ) {
      
      setCounter((prevCount) => {
        console.log(prevCount)
        if (prevCount % 5 === 0) {
          setFrameIndex((prevIndex) => (prevIndex + 1) % 4);
        }
        return prevCount +1;
      });
    }
  };

  const gameLoop = () => {
    update();

    window.requestAnimationFrame(() => gameLoop());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          console.log(direction.current);
          direction.current.y = -10;
          setActiveRow(2);
          break;
        case "ArrowDown":
          direction.current.y = 10;
          setActiveRow(0);
          break;
        case "ArrowLeft":
          direction.current.x = -10;
          setActiveRow(3);
          break;
        case "ArrowRight":
          direction.current.x = 10;
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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, []); // Empty dependency array to run effect only once

  const spriteSize = 32; // Size of each sprite (assuming 32x32)
  const framesPerRow = 4; // Number of frames in each row

  const frameX = (frameIndex % framesPerRow) * spriteSize;
  const frameY = activeRow * spriteSize;

  const logSomething = () => {
    console.log(counter)
  }

  return (
    <div id="game-container">
      <button onClick={gameLoop}>Start game</button>
      <button onClick={logSomething}>Log something</button>

      <Test position={position} frameX={frameX} frameY={frameY} />
    </div>
  );
}

export default MainScreen;
