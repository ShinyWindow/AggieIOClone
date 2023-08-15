import { useContext } from "react";
import DrawingContext from "../../context/DrawingContext";
import ColorPicker from "../ColorPicker";

const ArtSettingsBar = () => {
  return (
    <div className="bg-gray-600 text-white min-w-[264px] h-full">
      <div className="h-64 overflow-hidden">
        <ColorPicker />
      </div>
    </div>
  );
};

export default ArtSettingsBar;
