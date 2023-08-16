// DrawingProvider.js
import React, { useState, useEffect, useRef } from "react";
import DrawingContext from "./DrawingContext";

const DrawingProvider = ({ children }) => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [size, setSize] = useState(1);
  const [mode, setMode] = useState("draw");
  const [smoothingFactor, setSmoothingFactor] = useState(20);

  const [history, setHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const canvasRef = useRef(null); // Keep a reference to the canvas

  const initialBackgroundLayer = {
    canvasRef: useRef(null),
    visible: true,
    id: "Background",
    drawable: false,
  };

  const initialDrawableLayer = {
    canvasRef: useRef(null),
    visible: true,
    id: "Layer 1",
    drawable: true,
  };

  const [layers, setLayers] = useState([
    initialBackgroundLayer,
    initialDrawableLayer,
  ]);
  const [currentLayerIndex, setCurrentLayerIndex] = useState(1);
  const saveToHistory = (imageData) => {
    setHistory((prevHistory) => [...prevHistory, imageData]);
    setUndoHistory([]);
  };

  const undo = () => {
    if (history.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const lastImage = history[history.length - 1];
      setUndoHistory((prevUndoHistory) => [lastImage, ...prevUndoHistory]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      if (history.length > 1) {
        const nextLastImage = history[history.length - 2];
        ctx.putImageData(nextLastImage, 0, 0);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const redo = () => {
    if (undoHistory.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const nextImage = undoHistory[0];
      ctx.putImageData(nextImage, 0, 0);
      setHistory((prevHistory) => [...prevHistory, nextImage]);
      setUndoHistory((prevUndoHistory) => prevUndoHistory.slice(1));
    }
  };

  return (
    <DrawingContext.Provider
      value={{
        color,
        setColor,
        size,
        setSize,
        mode,
        setMode,
        smoothingFactor,
        setSmoothingFactor,
        history,
        undoHistory,
        undo,
        redo,
        saveToHistory,
        canvasRef,
        layers,
        setLayers,
        currentLayerIndex,
        setCurrentLayerIndex,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export default DrawingProvider;
