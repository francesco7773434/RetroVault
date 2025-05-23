import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/giochiActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      fetch("http://localhost:8082/utenti/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Errore nel recupero utente");
          return res.json();
        })
        .then((userData) => {
          dispatch({ type: "AUTH_SUCCESS", payload: { user: userData, token } });
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        });
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Navbar expand="lg" className="retro-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="retro-brand">
          RETROVAULT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-pixel-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/catalogo">Catalogo</Nav.Link>
            <Nav.Link href="/recensioni">Recensioni</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/profilo">
                Profilo
              </Nav.Link>
            )}
          </Nav>

          <div className="ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="text-white me-3">Ciao, {user.username}!</span>
                <Button onClick={handleLogout} className="retro-btn-logout">
                  Logout
                </Button>
              </>
            ) : (
              <Button href="/login" className="retro-btn-login">
                LOGIN
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
