import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import Catalogo from "./components/CatalogoGiochi/Catalogo";
import GiocoDettaglio from "./components/CatalogoGiochi/GiocoDettaglio";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/giochi/:id" element={<GiocoDettaglio />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
