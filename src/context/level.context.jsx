import React, { useEffect, useRef } from "react";

const LevelContext = React.createContext();

function LevelProviderWrapper(props) {
  const greenLandInitialObjectPositions = [
    { top: 100, left: 50, radius: 60 },
    { top: 400, left: 70, radius: 90 },
    { top: 580, left: 40, radius: 40 },
    { top: 130, left: 610, radius: 70 },
    { top: 60, left: 670, radius: 30 },
    { top: 150, left: 880, radius: 50 },
    { top: 280, left: 1180, radius: 70 },
    { top: 80, left: 1180, radius: 40 },
    { top: 510, left: 390, radius: 70 },
    { top: 620, left: 340, radius: 40 },
    { top: 620, left: 180, radius: 40 },
    { top: 570, left: 230, radius: 50 },
    { top: 730, left: 390, radius: 50 },
    { top: 740, left: 280, radius: 60 },
    { top: 830, left: 780, radius: 60 },
    { top: 579, left: 1030, radius: 60 },
    { top: 780, left: 1060, radius: 60 },
    { top: 780, left: 1180, radius: 60 },
    { top: 870, left: 1080, radius: 40 },
    { top: 440, left: 1250, radius: 40 },
    { top: 850, left: 1480, radius: 60 },
    // Greenland Woman character
    { top: 600, left: 900, radius: 25, human: true },
    //Moonflowers
    { top: 90, left: 150, radius: 35, flower: true },
    { top: 30, left: 850, radius: 35, flower: true },
    { top: 430, left: 850, radius: 35, flower: true },
    { top: 730, left: 150, radius: 35, flower: true },
    { top: 830, left: 1650, radius: 35, flower: true },
  ]; // object positions need to updated with reference to original positions
  const greenLandObjectCenterPositions = useRef([
    { top: 100, left: 50, radius: 60 },
    { top: 400, left: 70, radius: 90 },
    { top: 580, left: 40, radius: 40 },
    { top: 130, left: 610, radius: 70 },
    { top: 60, left: 670, radius: 30 },
    { top: 280, left: 1180, radius: 70 },
    { top: 80, left: 1180, radius: 40 },
    { top: 510, left: 390, radius: 70 },
    { top: 620, left: 340, radius: 40 },
    { top: 620, left: 180, radius: 40 },
    { top: 570, left: 230, radius: 50 },
    { top: 740, left: 280, radius: 60 },
    { top: 830, left: 780, radius: 60 },
    { top: 579, left: 1030, radius: 60 },
    { top: 780, left: 1060, radius: 60 },
    { top: 780, left: 1180, radius: 60 },
    { top: 870, left: 1080, radius: 40 },
    { top: 440, left: 1250, radius: 40 },
    { top: 850, left: 1480, radius: 60 },
    // Greenland Woman character
    { top: 600, left: 900, radius: 25, human: true },
    //Moonflowers
    { top: 90, left: 150, radius: 35, flower: true },
    { top: 30, left: 850, radius: 35, flower: true },
    { top: 430, left: 850, radius: 35, flower: true },
    { top: 730, left: 150, radius: 35, flower: true },
    { top: 830, left: 1650, radius: 35, flower: true },
  ]); // for collision detection

  return (
    <LevelContext.Provider
      value={{
        greenLandInitialObjectPositions,
        greenLandObjectCenterPositions,
      }}
    >
      {props.children}
    </LevelContext.Provider>
  );
}

export { LevelProviderWrapper, LevelContext };
