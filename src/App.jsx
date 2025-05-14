import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import Catalogo from "./components/CatalogoGiochi/Catalogo";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
