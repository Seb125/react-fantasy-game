import Inventory from "../components/Inventory";
import GreenLandContainer from "../maps/GreenLandContainer";
import { useContext } from "react";
import { LevelContext } from "../context/level.context";


function MainScreenUI({
  backgroundPosition,
  position,
  setPosition,
  setConverstaion,
  conversation,
  npcPosition,
    frameX,
    frameY,
    endGame
}) {
  
  const { inventory } = useContext(LevelContext);


  return (
    <div style={{position: "relative", backgroundColor: "black"}}>
    <GreenLandContainer backgroundPosition={backgroundPosition} position={position} setPosition={setPosition} frameX={frameX} frameY={frameY} conversation={conversation} setConverstaion={setConverstaion} npcPosition={npcPosition} endGame={endGame}/>
    {inventory? <Inventory />: ""}
    </div>
  );
}

export default MainScreenUI;
