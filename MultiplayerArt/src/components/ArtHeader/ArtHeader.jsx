import { useContext } from "react";
import Slider from "../Slider";
import DrawingContext from "../../context/DrawingContext";

const ArtHeader = () => {
  const { size, setSize, smoothingFactor, setSmoothingFactor, mode, setMode } =
    useContext(DrawingContext);

  const toggleMode = () => {
    if (mode === "draw") {
      setMode("erase");
    } else {
      setMode("draw");
    }
    console.log(mode);
  };
  return (
    <div className="h-10 bg-gray-700 text-white w-full flex items-center">
      <div>File</div>
      <div>Undo</div>
      <div>Redo</div>
      <button onClick={toggleMode}>Erase</button>
      <Slider value={size} onChange={setSize} title={"Size: " + size} />
      <Slider
        min={1}
        max={99}
        value={smoothingFactor}
        onChange={setSmoothingFactor}
        title={"Stability: " + smoothingFactor}
      />
    </div>
  );
};

export default ArtHeader;
