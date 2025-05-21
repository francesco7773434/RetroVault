import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import Catalogo from "./components/CatalogoGiochi/Catalogo";
import GiocoDettaglio from "./components/CatalogoGiochi/GiocoDettaglio";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";
import RecensioniPage from "./components/Recensioni/RecensioniPage";
import ProfiloUtente from "./components/Utente/ProfiloUtente";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/giochi/:id" element={<GiocoDettaglio />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/recensioni" element={<RecensioniPage />} />
          <Route path="/profilo" element={<ProfiloUtente />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
