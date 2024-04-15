import { useState, useEffect, useRef } from "react";
import image from "../assets/Rickettz.png";
// new feature
// second new feature
// change in main branch
function Test() {
  const backgroundElement = useRef(null);
  const [backgroundPosition, setBackgroundPosition] = useState("0px 0px");

  useEffect(() => {
    backgroundElement.current = document.getElementById("test");
  }, []);

  const doSomething = () => {
    const computedStyle = window.getComputedStyle(backgroundElement.current);

    // Get the backgroundPosition property from the computed style
    const bgp = computedStyle.getPropertyValue("background-position");
    // calculate new background Position
    const [currentX, currentY] = bgp.split(" ");
      const currentXValue = parseInt(currentX, 10);
      const currentYValue = parseInt(currentY, 10);
  
      // Subtract 10 from current background position
      const newX = currentXValue - 10;
      const newY = currentYValue - 10;
    console.log(newX, newY);
    setBackgroundPosition(`${newX}px ${newY}px`)
  };
  return (
    <div style={{ position: "relative" }}>
      <button onClick={doSomething}>Do Something</button>
      <div id="test" style={{ position: "absolute", backgroundImage: `url(${image})`, width: "100vw", height: "100vh", backgroundPosition: backgroundPosition, transition: "background-position 1s"  }}>
        Test
      </div>
    </div>
  );
}

export default Test;
