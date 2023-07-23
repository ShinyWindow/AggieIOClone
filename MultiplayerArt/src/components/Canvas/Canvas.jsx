import React, { useRef, useEffect, useState } from "react";

const Canvas = ({
  penColor = "rgb(0, 0, 0)",
  penSize = 10,
  smoothingFactor = 0.85,
  canvasWidth = 800,
  canvasHeight = 600,
  mode = "draw",
}) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({
    actual: { x: 0, y: 0 },
    smoothed: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
  });

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
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (!drawing) return;

    setPosition((pos) => ({ ...pos, actual: { x, y } }));
  };

  useEffect(() => {
    if (drawing) {
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
  }, [drawing, position.actual]);

  useEffect(() => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = penSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = mode === "draw" ? penColor : "rgba(0,0,0,1)";
    ctx.globalCompositeOperation =
      mode === "draw" ? "source-over" : "destination-out";

    const midX = (position.smoothed.x + position.previous.x) / 2;
    const midY = (position.smoothed.y + position.previous.y) / 2;
    ctx.quadraticCurveTo(position.previous.x, position.previous.y, midX, midY);
    ctx.stroke();
  }, [drawing, position.smoothed, penSize, mode, penColor]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
    />
  );
};

export default Canvas;
