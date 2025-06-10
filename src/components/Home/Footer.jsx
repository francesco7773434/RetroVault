import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="retro-footer mt-5 py-4 bg-dark text-white">
      <Container>
        <Row className="text-center">
          <Col md={6}>
            <p className="mb-2">© {new Date().getFullYear()} RetroVault. Tutti i diritti riservati.</p>
          </Col>
          <Col md={6}>
            <Link to="/contatti" className="text-white me-3" aria-label="Vai alla pagina contatti">
              Contatti
            </Link>
            <Link to="/privacy" className="text-white">
              Privacy
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
