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
  const [backgroundPosition, setBackgroundPosition] = useState("0px 0px");
  const isScreenMoving = useRef(false); // Track if the screen is moving

  // Loop Variables
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const frameTime = 60/1000;
  const navigate = useNavigate();

  // every iteration of game loop update function updates everything on screen (positions etc), looping through sprites
  const update = () => {
    setPosition((previousPosition) => {
      if (backgroundElement != null) {
        
          const computedStyle = window.getComputedStyle(
            backgroundElement.current
          );

          // Get the backgroundPosition property from the computed style
          const bgp = computedStyle.getPropertyValue("background-position");
          // calculate new background Position
          const [currentX, currentY] = bgp.split(" ");
          const currentXValue = parseInt(currentX, 10);
          const currentYValue = parseInt(currentY, 10);

          // if the window is bigger than the fixed gamescreen no scrolling is necesseary, otherwise only the amount of the difference
          const maxXScroll = 640 - window.innerWidth;
          const maxYScroll = 480 - window.innerHeight;

          // Subtract 10 from current background position
          // only chnage position under the condition that the Player is not at end of the background picture
          let newX;
          let newY;
          // left side
          if (!(currentXValue >= 0) && (previousPosition.x <= 0 + spriteSize)) {
            isScreenMoving.current = true;
            newX = currentXValue + 10;
          } else if (!(currentXValue <= -maxXScroll) && (previousPosition.x >= (window.innerWidth - 2*spriteSize))) { // right side
            isScreenMoving.current = true;

            newX = currentXValue - 10;
          }else{
            isScreenMoving.current = false;

            newX = currentXValue;
          }
          // top side
          if (!(currentYValue >= 0) && (previousPosition.y <= 0 + spriteSize)) {
            isScreenMoving.current = true;

            newY = currentYValue + 10;
          } else if (!(currentYValue <= -maxYScroll) && (previousPosition.y >= (window.innerHeight - 2*spriteSize))) { // bottom side
            isScreenMoving.current = true;

            newY = currentYValue - 10;
          }else{
            isScreenMoving.current = false;

            newY = currentYValue;
          }
          setBackgroundPosition(`${newX}px ${newY}px`);
        
      }
      // player should not be able to walk past the map
      let newPosition;
      // first check if the player is not at any border, so none of the other conditions have to be checked
      if(previousPosition.x > 0 && previousPosition.x < 620 && previousPosition.y > 0 && previousPosition.y < 450) {
        // !!!!!!!!!!!!!!!!!!!!!!!!! Here I want to adjust Players Position based on the background moving or not
      
      newPosition = {
        
        x: previousPosition.x + direction.current.x,
        y: previousPosition.y + direction.current.y,
    
    }
      } else if(previousPosition.x <= 0 && previousPosition.y <= 0) { // check if player is in the upper left corner
        if(direction.current.x > 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y
          }
        } else if (direction.current.y > 0){
          newPosition = {
            x: previousPosition.x ,
            y: previousPosition.y + direction.current.y
          }
        } else {
          newPosition = {
            x: previousPosition.x ,
            y: previousPosition.y
          }
        }
      } else if (previousPosition.x <= 0 && !(previousPosition.y <= 0) && !(previousPosition.y >= 450)) {
        // checking left border
        
        if(direction.current.x < 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y
          }
        } else if(direction.current.x >= 0) {
          newPosition = {
        
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
        }
        }
      } 
      else if (previousPosition.x >= 620 && !(previousPosition.y <= 0) && !(previousPosition.y >= 450)) { // checking right border
        console.log(previousPosition.x)
        if(direction.current.x > 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y
          }
        } else if(direction.current.x <= 0) {
          newPosition = {
        
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
        }
        }
      }else if (previousPosition.x <= 0 && previousPosition.y >= 450) { // checking is in lower left corner
        

        if(direction.current.x > 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y
          }
        } else if(direction.current.y < 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y +  direction.current.y
          }
        } else {
          newPosition = {
            x: previousPosition.x ,
            y: previousPosition.y
          }
        }
        console.log(newPosition)
      } else if (previousPosition.y >= 450 && !(previousPosition.x <= 0) && !(previousPosition.x >= 620)){ // checking if player is at the bottom of the map
        
        if(direction.current.y > 0) {
          newPosition = {
            x: previousPosition.x +direction.current.x,
            y: previousPosition.y
          }
        } else if (direction.current.y <= 0) {
          newPosition = {
            x: previousPosition.x +direction.current.x,
            y: previousPosition.y + direction.current.y
          }
        }
      } else if (previousPosition.y <= 0 && !(previousPosition.x <= 0) && !(previousPosition.x >= 620)) { // checking upper border
        if(direction.current.y < 0) {
          newPosition = {
            x: previousPosition.x +direction.current.x,
            y: previousPosition.y
          }
        } else if (direction.current.y >= 0) {
          newPosition = {
            x: previousPosition.x +direction.current.x,
            y: previousPosition.y + direction.current.y
          }
        }
      } else if(previousPosition.x >= 620 && previousPosition.y <= 0) { // check if player is in the upper right corner
        if(direction.current.x < 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y
          }
        } else if (direction.current.y > 0){
          newPosition = {
            x: previousPosition.x ,
            y: previousPosition.y + direction.current.y
          }
        } else {
          newPosition = {
            x: previousPosition.x ,
            y: previousPosition.y
          }
        } }
        else if(previousPosition.y >= 450 && previousPosition.x >= 620) { // check if player is in the lower right corner
          if(direction.current.x < 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y
            }
          } else if (direction.current.y < 0){
            newPosition = {
              x: previousPosition.x ,
              y: previousPosition.y + direction.current.y
            }
          } else {
            newPosition = {
              x: previousPosition.x ,
              y: previousPosition.y
            }
          } }
      else {  
        newPosition = {
        
          x: previousPosition.x + direction.current.x,
          y: previousPosition.y + direction.current.y,
      }
      }
        
    

      return newPosition;
    });

    animateSprite();
  };

  const animateSprite = () => {
      setCounter((prevCount) => {
        if (prevCount % 10 === 0) {
          if(direction.current.x !== 0 || direction.current.y !== 0) {
            setFrameIndex((prevIndex) => (prevIndex + 1) % 4);
          } else if(isScreenMoving.current === true) {
            console.log("not Moving but sliding")

          setFrameIndex((prevIndex) => (prevIndex + 1) % 4);
        }
      }
        return prevCount + 1;
      });
    }
  

 
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
    }

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
    navigate("/game-over");
  };

  return (
    <div
      id="game-container"
      style={{
        backgroundPosition: backgroundPosition,
        transition: "background-position 0.1s",
      }}
    >
      <button onClick={endGame}>EndGame</button>
      <Player position={position} frameX={frameX} frameY={frameY} />
    </div>
  );
}

export default MainScreen;
