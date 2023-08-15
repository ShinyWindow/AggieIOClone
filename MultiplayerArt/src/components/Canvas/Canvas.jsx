import React, { useRef, useEffect, useState, useContext } from "react";
import DrawingContext from "../../context/DrawingContext";

const Canvas = ({ canvasWidth = 800, canvasHeight = 600 }) => {
  const {
    color,
    smoothingFactor,
    size,
    mode,
    undo,
    redo,
    saveToHistory,
    canvasRef,
  } = useContext(DrawingContext);
  let [tempSmoothing, setTempSmoothing] = useState(
    smoothingFactor ? smoothingFactor * 0.01 : 0.2
  );
  const [penColor, setPenColor] = useState(
    color
      ? `rgba(${color.r},${color.g},${color.b},${color.a})`
      : "rgba(0,0,0,1)"
  );
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({
    actual: { x: 0, y: 0 },
    smoothed: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
  });

  useEffect(() => {
    const newPenColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    setPenColor(newPenColor);
  }, [color]);

  useEffect(() => {
    let newSmoothingFactor = smoothingFactor * 0.01;
    setTempSmoothing(newSmoothingFactor);
  }, [smoothingFactor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMouseUp = () => {
    setDrawing(false);
    // Save the current image data after a line is drawn
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    saveToHistory(imageData); // Using the function from context now
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
          pos.smoothed.x * tempSmoothing + pos.actual.x * (1 - tempSmoothing);
        const smoothedY =
          pos.smoothed.y * tempSmoothing + pos.actual.y * (1 - tempSmoothing);

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
    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = mode === "draw" ? penColor : "rgba(0,0,0,1)";
    ctx.globalCompositeOperation =
      mode === "draw" ? "source-over" : "destination-out";

    const midX = (position.smoothed.x + position.previous.x) / 2;
    const midY = (position.smoothed.y + position.previous.y) / 2;
    ctx.quadraticCurveTo(position.previous.x, position.previous.y, midX, midY);
    ctx.stroke();
  }, [drawing, position.smoothed, size, mode, penColor]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </>
  );
};

export default Canvas;
