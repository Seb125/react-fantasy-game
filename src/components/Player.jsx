import { useState, useEffect, useRef } from "react";

function Player() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [frameIndex, setFrameIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [moving, setMoving] = useState(false);
  const [arrowStates, setArrowStates] = useState({up: false, right: false, down: false, left: false});
  const myArrowState = useRef(arrowStates);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 10; // Adjust the speed as needed
      switch (event.key) {
        case "ArrowUp":
          
          if(myArrowState.current.left === true) {
            setPosition((prevPosition) => ({
              x: prevPosition.x - speed,
              y: prevPosition.y - speed,
            }));
          } else if (myArrowState.current.right === true) {
            console.log("moving up right")
            setPosition((prevPosition) => ({
              x: prevPosition.x + speed,
              y: prevPosition.y - speed,
            }));
          } else {
            setPosition((prevPosition) => ({
              ...prevPosition,
              y: prevPosition.y - speed,
            }));
          }
          setActiveRow(2);
          setMoving(true);
          
          myArrowState.current = {...myArrowState.current, up: true};
        
          break;
        case "ArrowDown":
          if(myArrowState.current.left === true) {
            setPosition((prevPosition) => ({
              x: prevPosition.x - speed,
              y: prevPosition.y + speed,
            }));
          } else if (myArrowState.current.right === true) {
            console.log("moving up right")
            setPosition((prevPosition) => ({
              x: prevPosition.x + speed,
              y: prevPosition.y + speed,
            }));
          } else {
            setPosition((prevPosition) => ({
              ...prevPosition,
              y: prevPosition.y + speed,
            }));
          }
          setActiveRow(0);
          setMoving(true);
          myArrowState.current = {...myArrowState.current, down: true};


          break;
        case "ArrowLeft":
          if(myArrowState.current.up === true) {
            setPosition((prevPosition) => ({
              x: prevPosition.x - speed,
              y: prevPosition.y - speed,
            }));
          } else if (myArrowState.current.down === true) {
            console.log("moving up right")
            setPosition((prevPosition) => ({
              x: prevPosition.x - speed,
              y: prevPosition.y + speed,
            }));
          } else {
            setPosition((prevPosition) => ({
              ...prevPosition,
              x: prevPosition.x - speed,
            }));
          }
          setActiveRow(3);
          setMoving(true);
          
          myArrowState.current = {...myArrowState.current, left: true};


        
          break;
        case "ArrowRight":
          if(myArrowState.current.up === true) {
            setPosition((prevPosition) => ({
              x: prevPosition.x + speed,
              y: prevPosition.y - speed,
            }));
          } else if (myArrowState.current.down === true) {
            console.log("moving up right")
            setPosition((prevPosition) => ({
              x: prevPosition.x + speed,
              y: prevPosition.y + speed,
            }));
          } else {
            setPosition((prevPosition) => ({
              ...prevPosition,
              x: prevPosition.x + speed,
            }));
          }
          setActiveRow(1);
          setMoving(true);
          
          myArrowState.current = {...myArrowState.current, right: true};


        
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      
      switch (event.key) {
        case "ArrowUp":
          myArrowState.current = {...myArrowState.current, up: false};

          break;
        case "ArrowDown":
          myArrowState.current = {...myArrowState.current, down: false};

          break;
        case "ArrowLeft":
          myArrowState.current = {...myArrowState.current, left: false};

          break;
        case "ArrowRight":
          myArrowState.current = {...myArrowState.current, right: false};

          break;
        default:
          break;
      }
        setMoving(false);
        setFrameIndex(0);
        
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyDown);

    };
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    const id = setInterval(() => {
      if(moving) {
          setFrameIndex((prevIndex) => (prevIndex + 1) % 4); // Assuming 16 frames
      }
    }, 200); // Adjust the interval duration as needed
    return () => clearInterval(id);
  }, [moving]);

  const spriteSize = 32; // Size of each sprite (assuming 32x32)
  const framesPerRow = 4; // Number of frames in each row

  const frameX = (frameIndex % framesPerRow) * spriteSize;
  const frameY = activeRow * spriteSize;

  const doSomething = () => {
    console.log(arrowStates);
  }

  return (
    <div>
    <button onClick={doSomething}>Log Something</button>
    <div
      style={{ position: "absolute", top: position.y, left: position.x, backgroundPosition: `-${frameX}px -${frameY}px` }}
      className="container"
    ></div>
    </div>
  );
}

export default Player;
