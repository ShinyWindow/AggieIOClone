import React from "react";
import DrawingProvider from "../../context/DrawingProvider";
import DrawingApp from "../../components/DrawingApp";

const DrawingPage = () => {
  return (
    <DrawingProvider>
      <DrawingApp />
    </DrawingProvider>
  );
};

export default DrawingPage;
