import { HexColorPicker, RgbaColorPicker } from "react-colorful";

const ColorPicker = ({ color, setColor }) => {
  const handleChange = (color) => {
    console.log(color);
    setColor(color);
  };

  return (
    <div className="custom-layout h-full w-full">
      <RgbaColorPicker color={color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;
