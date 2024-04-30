import { LevelContext } from "../context/level.context";
import { useContext } from "react";

function Inventory() {
  const { inventoryItems } =
    useContext(LevelContext);


  return (
    <div id="inventory">
      <div style={{position: "absolute", top: "80px", left: "50px"}}>
      <table>
      <tbody>
        {[...Array(5)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(5)].map((_, colIndex) => (
              <td key={colIndex} style={{width: "100px"}}>
                {inventoryItems.current[rowIndex * 5 + colIndex]?.name}
              </td>
            ))}
              
          </tr>
        ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
