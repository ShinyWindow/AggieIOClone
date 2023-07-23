import Canvas from "../../components/Canvas";
import ArtHeader from "../../components/ArtHeader";
import ArtToolbar from "../../components/ArtToolbar";
import ArtSettingsBar from "../../components/ArtSettingsBar";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [size, setSize] = useState("#fff");
  const [mode, setMode] = useState("draw");

  return (
    <div className="bg-gray-400 w-full h-full">
      <ArtHeader />
      <div className="flex justify-between h-[calc(100%-40px)]">
        <ArtToolbar />
        <div>
          <Canvas
            penColor={`rgba(${color.r},${color.g},${color.b},${color.a})`}
            penSize={size}
            smoothingFactor={0.2}
            width={1200}
            height={800}
            mode={mode}
          />
        </div>
        <ArtSettingsBar
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
          mode={mode}
          setMode={setMode}
        />
      </div>
    </div>
  );
};

export default HomePage;
