import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DrawingPage from "./pages/DrawingPage";
import DrawingProvider from "./context/DrawingProvider";

function App() {
  return (
    <DrawingProvider>
      <Routes>
        <Route path="/" element={<DrawingPage />} />
      </Routes>
    </DrawingProvider>
  );
}

export default App;
