import { Button, Container, Nav, Navbar } from "react-bootstrap";

const TopBar = () => {
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
            <Nav.Link href="/profilo">Profilo</Nav.Link>
          </Nav>
          <Button href="/login" className="retro-btn-login">
            LOGIN
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
