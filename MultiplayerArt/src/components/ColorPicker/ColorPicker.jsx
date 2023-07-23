import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPicker = ({ color, setColor }) => {
  const handleChange = (color) => {
    setColor(color);
  };

  return (
    <div className="custom-layout h-full w-full">
      <HexColorPicker color={color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;
