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
      id: `Layer ${layers.length}`,
      drawable: true,
    };
    setLayers((prev) => [...prev, newLayer]);
  };

  return (
    <div>
      {layers.map((layer, index) => (
        <div key={layer.id}>
          <span
            onClick={() => {
              console.log("Setting layer to:", index);
              setCurrentLayerIndex(index);
            }}
          >
            {layer.id}
          </span>
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => {
              const updatedLayers = [...layers];
              updatedLayers[index].visible = !updatedLayers[index].visible;
              setLayers(updatedLayers);
            }}
          />
        </div>
      ))}
      <button onClick={addLayer}>Add Layer</button>
    </div>
  );
};

export default LayerControl;
