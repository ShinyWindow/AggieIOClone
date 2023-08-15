import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas";
import ArtHeader from "../../components/ArtHeader";
import ArtToolbar from "../../components/ArtToolbar";
import ArtSettingsBar from "../../components/ArtSettingsBar";

const DrawingApp = () => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [spacePressed, setSpacePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === " ") {
        setSpacePressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (spacePressed) {
      setDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (spacePressed) {
      setDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging && spacePressed) {
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY,
      });
    }
  };

  const handleWheel = (e) => {
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setScale(scale + delta);
  };

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <ArtHeader />
      </div>
      <div className="fixed left-0 h-full mt-10 z-10">
        <ArtToolbar />
      </div>
      <div className="fixed right-0 h-full mt-10 z-10">
        <ArtSettingsBar />
      </div>
      <div
        className="bg-gray-400 w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <Canvas width={1920} height={1080} />
        </div>
      </div>
    </>
  );
};

export default DrawingApp;
