import { Link, useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
  };
  return (
    <div id="start-screen">
      <div
        onClick={startGame}
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          
        }}
      ></div>
      <Link to="/game"></Link>
    </div>
  );
}

export default StartScreen;
