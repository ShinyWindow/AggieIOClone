import Canvas from "../../components/Canvas";
import ArtHeader from "../../components/ArtHeader";
import ArtToolbar from "../../components/ArtToolbar";
import ArtSettingsBar from "../../components/ArtSettingsBar";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [color, setColor] = useState("#fff");
  const [size, setSize] = useState("#fff");

  return (
    <div className="bg-gray-400 w-full h-full">
      <ArtHeader />
      <div className="flex justify-between h-[calc(100%-40px)]">
        <ArtToolbar />
        <div>
          <Canvas
            penColor={color}
            penSize={size}
            smoothingFactor={0.5}
            width={1200}
            height={800}
          />
        </div>
        <ArtSettingsBar
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
        />
      </div>
    </div>
  );
};

export default HomePage;
