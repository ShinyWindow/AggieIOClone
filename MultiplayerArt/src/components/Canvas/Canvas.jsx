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
    layers,
    currentLayerIndex,
  } = useContext(DrawingContext);

  const canvasRef = layers[currentLayerIndex]?.canvasRef || useRef(null);

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
    if (layers[0].id === "Background" && layers[0].canvasRef.current) {
      const canvas = layers[0].canvasRef.current;
      const context = canvas.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const handleMouseUp = () => {
    if (!canvasRef.current) return;

    setDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    saveToHistory(imageData);
  };

  const handleMouseDown = (e) => {
    if (!canvasRef.current || !layers[currentLayerIndex].drawable) return;
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
    if (!canvasRef.current) return;
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
    if (!drawing || !canvasRef.current) return;

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
    <div
      style={{
        position: "relative",
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      {layers.map((layer, index) => (
        <canvas
          key={layer.id}
          ref={layer.canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: layer.visible ? "block" : "none",
            zIndex: index,
          }}
          width={canvasWidth}
          height={canvasHeight}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: layers.length,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Canvas;
