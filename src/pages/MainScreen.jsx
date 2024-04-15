import Player from "../components/Player";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Maps
import GreenLand from "../maps/GreenLand";


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
  // Loop Variables
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const frameTime = 60 / 1000;

  const framesPerRow = 4; // Number of sprites in each row
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
        const maxXScroll = 1792 - window.innerWidth;
        const maxYScroll = 1024 - window.innerHeight;

        // Subtract 10 from current background position
        // only chnage position under the condition that the Player is not at end of the background picture
        let newX;
        let newY;
        // left side
        if (!(currentXValue >= 0) && previousPosition.x <= 0 + spriteSize) {
          isScreenMoving.current = true;
          newX = currentXValue + 10;
          newY = currentYValue;
        } else if (
          !(currentXValue <= -maxXScroll) &&
          previousPosition.x >= window.innerWidth - 2 * spriteSize
        ) {
          // right side
          isScreenMoving.current = true;
          newX = currentXValue - 10;
          newY = currentYValue;
        } else if (
          !(currentYValue >= 0) &&
          previousPosition.y <= 0 + spriteSize
        ) {
          // top side
          isScreenMoving.current = true;
          newX = currentXValue;
          newY = currentYValue + 10;
        } else if (
          !(currentYValue <= -maxYScroll) &&
          previousPosition.y >= window.innerHeight - 2 * spriteSize
        ) {
          // bottom side
          isScreenMoving.current = true;
          newX = currentXValue;
          newY = currentYValue - 10;
        } else {
          isScreenMoving.current = false;

          newX = currentXValue;
          newY = currentYValue;
        }
        setBackgroundPosition(`${newX}px ${newY}px`);
      }
      // player should not be able to walk past the map
      let newPosition;
      const bottomBorder = previousPosition.y >= borders.current.bottom;
      const upperBorder = previousPosition.y <= 0;
      const leftBorder = previousPosition.x <= 0;
      const rightBorder = previousPosition.x >= borders.current.right;

      if (!bottomBorder && !upperBorder && !leftBorder && !rightBorder) {
        newPosition = {
          x: previousPosition.x + direction.current.x,
          y: previousPosition.y + direction.current.y,
        };
      } else if (bottomBorder && leftBorder) {
        if (direction.current.x > 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y,
          };
        } else if (direction.current.y < 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y,
          };
        } else {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y,
          };
        }
      } else if (bottomBorder && rightBorder) {
        if (direction.current.x < 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y,
          };
        } else if (direction.current.y < 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y,
          };
        } else {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y,
          };
        }
      } else if (leftBorder && upperBorder) {
        if (direction.current.x > 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y,
          };
        } else if (direction.current.y > 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y,
          };
        } else {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y,
          };
        }
      } else if (upperBorder && rightBorder) {
        if (direction.current.x < 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y,
          };
        } else if (direction.current.y > 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y,
          };
        } else {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y,
          };
        }
      } else if (bottomBorder) {
        if (direction.current.y > 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y,
          };
        } else if (direction.current.y <= 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
          };
        }
      } else if (upperBorder) {
        if (direction.current.y < 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y,
          };
        } else if (direction.current.y >= 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
          };
        }
      } else if (leftBorder) {
        if (direction.current.x < 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y,
          };
        } else if (direction.current.x >= 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
          };
        }
      } else if (rightBorder) {
        if (direction.current.x > 0) {
          newPosition = {
            x: previousPosition.x,
            y: previousPosition.y + direction.current.y,
          };
        } else if (direction.current.x <= 0) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
          };
        }
      }

      return newPosition;
    });

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
          direction.current.y = -1;
          pressedKeys.current.up = true;
          break;
        case "ArrowDown":
          direction.current.y = 1;
          pressedKeys.current.down = true;
          break;
        case "ArrowLeft":
          direction.current.x = -1;
          pressedKeys.current.left = true;
          break;
        case "ArrowRight":
          direction.current.x = 1;
          pressedKeys.current.right = true;
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

    // Redirect to Game Over Screen
    navigate("/game-over");
  };

  return (
    <div>
    <GreenLand backgroundPosition={backgroundPosition} position={position} frameX={frameX} frameY={frameY} />
    </div>
  );
}

export default MainScreen;
