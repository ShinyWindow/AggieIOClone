import { useContext } from "react";
import Slider from "../Slider";
import DrawingContext from "../../context/DrawingContext";
import undoIcon from "../../assets/svg/undoIcon.svg";
import redoIcon from "../../assets/svg/redoIcon.svg";
import eraserIcon from "../../assets/svg/eraserIcon.svg";

const ArtHeader = () => {
  const {
    size,
    setSize,
    smoothingFactor,
    setSmoothingFactor,
    mode,
    setMode,
    undo,
    redo,
  } = useContext(DrawingContext);

  const toggleMode = () => {
    if (mode === "draw") {
      setMode("erase");
    } else {
      setMode("draw");
    }
    console.log(mode);
  };
  return (
    <div className="h-10 bg-gray-600 text-white px-2 flex justify-between items-center">
      <div className="art-items-parent h-full w-full flex items-center">
        <div className="h-4 w-4 bg-white"></div>
        <div className="h-4 w-4 bg-white"></div>
        <div className="h-4 w-4 bg-white mr-2"></div>
        <button onClick={undo} className="">
          <img src={undoIcon} className="w-5 h-5" />
        </button>
        <button onClick={redo} className="">
          <img src={redoIcon} className="w-5 h-5" />
        </button>
        <button
          onClick={toggleMode}
          className={`w-6 h-6 ${mode === "erase" ? "bg-gray-700" : ""}`}
          style={{
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          <img style={{ color: "white" }} src={eraserIcon} />
        </button>
        <div className="">
          <Slider
            min={1}
            value={size}
            onChange={setSize}
            title={"Size: " + size}
          />
        </div>
        <div className="">
          <Slider
            min={1}
            max={99}
            value={smoothingFactor}
            onChange={setSmoothingFactor}
            title={"Stability: " + smoothingFactor}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-36">space filler stuff</div>
        <div className="flex items-center w-28 border p-1">
          <div className="h-6 w-6 bg-gray-300 mr-1"></div>
          <div>William</div>
        </div>
      </div>
    </div>
  );
};

export default ArtHeader;
