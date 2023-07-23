import ColorPicker from "../ColorPicker";
import Slider from "../Slider";

const ArtSettingsBar = (props) => {
  const { color, setColor, size, setSize } = props;
  return (
    <div className="bg-gray-700 text-white min-w-[264px] h-full">
      <div className="h-64 overflow-hidden">
        <ColorPicker color={color} setColor={setColor} />
      </div>
      <Slider value={size} onChange={setSize} />
    </div>
  );
};

export default ArtSettingsBar;
