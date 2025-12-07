import { useState } from "react";

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickedPositions, setClickedPositions] = useState([]);

  const getOffsetInfo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    return {
      offsetX,
      offsetY,
    };
  };

  const [hover, setHover] = useState(true);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const className = hover ? "trackerBall" : "beep";

  return (
    <>
      <div className="trackerInfo">
        <p>현재 위치</p>
        <span style={{ whiteSpace: "pre-wrap" }}>
          X: {position.x} {` `} Y: {position.y}
        </span>
      </div>
      <div
        className="trackerArea"
        onMouseMove={(e) => {
          const { offsetX, offsetY } = getOffsetInfo(e);

          setPosition({
            x: offsetX,
            y: offsetY,
          });
        }}
        onClick={(e) => {
          const { offsetX, offsetY } = getOffsetInfo(e);

          setClickedPositions([
            ...clickedPositions,
            { x: offsetX, y: offsetY },
          ]);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        마우스 트래킹 하는 공간
        <div
          className={className}
          style={{
            top: position.y,
            left: position.x,
          }}
        />
        {clickedPositions.map((clickedPosition, index) => {
          return (
            <div
              key={index}
              className="clickedBall"
              style={{
                top: clickedPosition.y,
                left: clickedPosition.x,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default MouseTracker;
