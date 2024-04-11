function Player({position, frameX, frameY}) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          backgroundPosition: `-${frameX}px -${frameY}px`
        }}
        className="container"
      ></div>
    </div>
  );
}

export default Player;
