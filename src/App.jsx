import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import Catalogo from "./components/CatalogoGiochi/Catalogo";
import GiocoDettaglio from "./components/CatalogoGiochi/GiocoDettaglio";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";
import RecensioniPage from "./components/Recensioni/RecensioniPage";
import ProfiloUtente from "./components/Utente/ProfiloUtente";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUserFromLocalStorage } from "./redux/actions/giochiActions";
import Backoffice from "./components/Backoffice/Backoffice";
import AdminGiochi from "./components/Backoffice/AdminGiochi";
import AdminRecensioni from "./components/Backoffice/AdminRecensioni";
import AdminUtenti from "./components/Backoffice/AdminUtenti";
import AdminPiattaforme from "./components/Backoffice/AdminPiattaforme";
import Contatti from "./components/Home/Contatti";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);
  const user = useSelector((state) => state.auth.user);

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

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
          <Route path="/contatti" element={<Contatti />} />

          <Route
            path="/profilo"
            element={
              <ProtectedRoute user={user}>
                <ProfiloUtente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <Backoffice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/giochi"
            element={
              <ProtectedRoute user={user}>
                <AdminGiochi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/recensioni"
            element={
              <ProtectedRoute user={user}>
                <AdminRecensioni />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/utenti"
            element={
              <ProtectedRoute user={user}>
                <AdminUtenti />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/piattaforme"
            element={
              <ProtectedRoute user={user}>
                <AdminPiattaforme />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
