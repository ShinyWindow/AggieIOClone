import React, { useRef, useEffect, useState } from "react";

const Canvas = ({
  penColor = "#000000",
  penSize = 10,
  smoothingFactor,
  canvasWidth = 800,
  canvasHeight = 600,
}) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({
    actual: { x: 0, y: 0 },
    smoothed: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
  });

  // Initialize the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineJoin = "round";
    context.lineCap = "round";
    context.strokeStyle = penColor;
    context.lineWidth = penSize;
  }, [penColor, penSize]);

  const handleMouseUp = () => {
    setDrawing(false);
  };

  // Handle mouse events
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);

    setDrawing(true);
    setPosition({ actual: { x, y }, smoothed: { x, y }, previous: { x, y } });
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (!drawing) return;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Update actual position
    setPosition((pos) => ({ ...pos, actual: { x, y } }));
  };

  useEffect(() => {
    if (drawing) {
      // Use the smoothingFactor prop here
      setPosition((pos) => {
        const smoothedX =
          pos.smoothed.x * smoothingFactor +
          pos.actual.x * (1 - smoothingFactor);
        const smoothedY =
          pos.smoothed.y * smoothingFactor +
          pos.actual.y * (1 - smoothingFactor);
        return {
          actual: pos.actual,
          smoothed: { x: smoothedX, y: smoothedY },
          previous: pos.smoothed,
        };
      });
    }
  }, [drawing, position.actual, smoothingFactor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const midX = (position.smoothed.x + position.previous.x) / 2;
    const midY = (position.smoothed.y + position.previous.y) / 2;

    ctx.quadraticCurveTo(position.previous.x, position.previous.y, midX, midY);
    ctx.stroke();
  }, [drawing, position.smoothed]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default Canvas;
