import { Link, useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
  };
  return (
    <div id="start-screen">
      <button className="button" onClick={startGame}>Start Game</button>
    </div>
  );
}

export default StartScreen;
