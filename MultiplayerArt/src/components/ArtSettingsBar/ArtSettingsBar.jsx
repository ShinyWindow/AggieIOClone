import { useContext } from "react";
import DrawingContext from "../../context/DrawingContext";
import ColorPicker from "../ColorPicker";
import LayerControl from "../LayerControl";

const ArtSettingsBar = () => {
  return (
    <div className="bg-gray-600 text-white min-w-[264px] flex flex-col h-full">
      <div className="h-64 overflow-hidden flex-shrink-0">
        <ColorPicker />
      </div>
      <div className="flex-grow overflow-hidden">
        <LayerControl />
      </div>
    </div>
  );
};

export default ArtSettingsBar;
