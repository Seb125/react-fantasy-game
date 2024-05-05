import Player from "../components/Player";
import myAudioFile from "../assets/greenland-music.mp3";

function GreenLandUI({
  moonflowerOneRef,
  moonflowerTwoRef,
  moonflowerThreeRef,
  moonflowerFourRef,
  moonflowerFiveRef,
  audioRef,
  backgroundPosition,
  position,
  frameX,
  frameY
}) {

  return (
    <div
      id="game-container"
      style={{
        backgroundPosition: `${backgroundPosition[0]}px ${backgroundPosition[1]}px`,
        transition: "background-position 0.1s",
      }}
    >
      <Player position={position} frameX={frameX} frameY={frameY} />
      <div
        id="green-land-woman"
        style={{
          position: "absolute",
          top: 600,
          left: 900,
          backgroundPosition: `-${0}px -${0}px`,
        }}
      ></div>
      <div>
        <p
          id="greenland-npc"
          style={{
            position: "absolute",
            padding: "5px",
            top: 500,
            left: 900,
            border: "solid rgb(64, 38, 21) ",
            borderStyle: "double",
            width: "200px",
            display: "none",
            color: "white",
            textShadow: "2px 2px blue",
          }}
        ></p>
      </div>
      <div
        className="moonflower"
        ref={moonflowerOneRef}
        id="moonflowerOne"
        style={{ position: "absolute", top: 80, left: 150 }}
      ></div>
      <div
        className="moonflower"
        ref={moonflowerTwoRef}
        id="moonflowerTwo"
        style={{ position: "absolute", top: 20, left: 850 }}
      ></div>
      <div
        className="moonflower"
        ref={moonflowerThreeRef}
        id="moonflowerThree"
        style={{ position: "absolute", top: 420, left: 850 }}
      ></div>
      <div
        className="moonflower"
        ref={moonflowerFourRef}
        id="moonflowerFour"
        style={{ position: "absolute", top: 720, left: 150 }}
      ></div>
      <div
        className="moonflower"
        ref={moonflowerFiveRef}
        id="moonflowerFive"
        style={{ position: "absolute", top: 820, left: 1650 }}
      ></div>
      <audio autoPlay ref={audioRef}>
        <source src={myAudioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default GreenLandUI;
