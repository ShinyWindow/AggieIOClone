import React, { useContext } from "react";
import DrawingContext from "../../context/DrawingContext";

const LayerControl = () => {
  const { layers, setLayers, currentLayerIndex, setCurrentLayerIndex } =
    useContext(DrawingContext);

  const addLayer = () => {
    const newCanvasRef = React.createRef();
    const newLayer = {
      canvasRef: newCanvasRef,
      visible: true,
      id: `Layer #${layers.length}`,
      drawable: true,
    };
    setLayers((prev) => [...prev, newLayer]);
    setCurrentLayerIndex(layers.length); // set to the new top layer
  };

  return (
    <div className="w-full flex flex-col h-full px-1">
      <div className="w-full flex justify-between items-center">
        <div>Layers</div>
        <button
          className="hover-bg h-7 w-7 flex flex-col justify-center pb-1 font-semibold text-2xl"
          onClick={addLayer}
        >
          +
        </button>
      </div>
      <div className="flex-grow overflow-auto">
        {[...layers].reverse().map((layer, reversedIndex) => {
          const actualIndex = layers.length - 1 - reversedIndex;
          return (
            <div
              key={layer.id}
              className={`h-10 flex items-center px-1 mt-1 ${
                actualIndex === currentLayerIndex
                  ? "selected-grey"
                  : "layer-grey"
              }`}
              onClick={() => {
                console.log("Setting layer to:", actualIndex);
                setCurrentLayerIndex(actualIndex);
              }}
            >
              <input
                className="mr-1"
                type="checkbox"
                checked={layer.visible}
                onChange={() => {
                  const updatedLayers = [...layers];
                  updatedLayers[actualIndex].visible =
                    !updatedLayers[actualIndex].visible;
                  setLayers(updatedLayers);
                }}
              />
              <div className="h-8 w-8 mr-1 bg-gray-200"></div>
              <span className="text-sm">{layer.id}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayerControl;
