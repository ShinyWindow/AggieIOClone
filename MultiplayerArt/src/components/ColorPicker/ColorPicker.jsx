import { RgbaColorPicker } from "react-colorful";
import DrawingContext from "../../context/DrawingContext";
import { useContext } from "react";

const ColorPicker = () => {
  const { color, setColor } = useContext(DrawingContext);
  const handleChange = (color) => {
    setColor(color);
  };

  return (
    <div className="custom-layout h-full w-full">
      <RgbaColorPicker color={color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;
