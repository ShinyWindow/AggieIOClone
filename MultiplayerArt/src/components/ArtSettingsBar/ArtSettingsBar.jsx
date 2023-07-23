import ColorPicker from "../ColorPicker";
import Slider from "../Slider";

const ArtSettingsBar = (props) => {
  const { color, setColor, size, setSize, mode, setMode } = props;

  const toggleMode = () => {
    if (mode === "draw") {
      setMode("erase");
    } else {
      setMode("draw");
    }
  };

  return (
    <div className="bg-gray-700 text-white min-w-[264px] h-full">
      <div className="h-64 overflow-hidden">
        <ColorPicker color={color} setColor={setColor} />
      </div>
      <Slider value={size} onChange={setSize} />
      <div onClick={toggleMode}>{mode}</div>
    </div>
  );
};

export default ArtSettingsBar;
