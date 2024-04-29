import { LevelContext } from "../context/level.context";
import { useContext } from "react";

function Inventory() {
  const { inventoryItems } =
    useContext(LevelContext);


  return (
    <div id="inventory">
      <div>
        {inventoryItems.current.map((el, index) => (
            
                <h2 key={index}>{el.name}</h2>
            
        ))}
      </div>
    </div>
  );
}

export default Inventory;
