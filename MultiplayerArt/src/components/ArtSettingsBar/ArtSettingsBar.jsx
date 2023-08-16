import { useContext } from "react";
import DrawingContext from "../../context/DrawingContext";
import ColorPicker from "../ColorPicker";
import LayerControl from "../LayerControl";

const ArtSettingsBar = () => {
  return (
    <div className="bg-gray-600 text-white min-w-[264px] h-full">
      <div className="h-64 overflow-hidden">
        <ColorPicker />
      </div>
      <LayerControl />
    </div>
  );
};

export default ArtSettingsBar;
