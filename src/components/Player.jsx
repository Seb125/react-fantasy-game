import { useState, useEffect } from "react";

function Player() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [frameIndex, setFrameIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 10; // Adjust the speed as needed
      switch (event.key) {
        case "ArrowUp":
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y - speed,
          }));
          setActiveRow(2);
          setMoving(true);
          break;
        case "ArrowDown":
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y + speed,
          }));
          setActiveRow(0);
          setMoving(true);
          break;
        case "ArrowLeft":
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x - speed,
          }));
          setActiveRow(3);
          setMoving(true);
          break;
        case "ArrowRight":
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x + speed,
          }));
          setActiveRow(1);
          setMoving(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
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
    setIntervalId(id);
    return () => clearInterval(id);
  }, [moving]);

  const spriteSize = 32; // Size of each sprite (assuming 32x32)
  const framesPerRow = 4; // Number of frames in each row

  const frameX = (frameIndex % framesPerRow) * spriteSize;
  const frameY = activeRow * spriteSize;

  console.log(frameIndex)
  const stopInterval = () => {
    console.log("button clicked")
   
  }

  return (
    <div>
    <button onClick={stopInterval}>Stop Interval</button>
    <div
      style={{ position: "absolute", top: position.y, left: position.x, backgroundPosition: `-${frameX}px -${frameY}px` }}
      className="container"
    ></div>
    </div>
  );
}

export default Player;
