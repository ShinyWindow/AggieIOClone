// DrawingProvider.js
import React, { useState, useEffect } from "react";
import DrawingContext from "./DrawingContext";

const DrawingProvider = ({ children }) => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [size, setSize] = useState(1);
  const [mode, setMode] = useState("draw");
  const [smoothingFactor, setSmoothingFactor] = useState(20);

  // ... any other states and functions ...

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
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export default DrawingProvider;
