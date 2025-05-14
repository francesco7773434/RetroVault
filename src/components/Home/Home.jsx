import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="home-container text-center">
      <Row>
        <Col>
          <h1 className="retro-title mb-5">Benvenuto su RetroVault</h1>
          <p className="retro-subtitle mb-5 mt-4">Esplora, vota e condividi la tua passione per i videogiochi retrò!</p>
          <Link to="/catalogo">
            <Button className="retro-btn-login mb-5">ESPLORA ORA</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="retro-placeholder p-4 border border-warning rounded">[ Prossimamente: anteprima giochi... ]</div>
        </Col>
        <Col md={8}>
          <div className="retro-placeholder p-4 border border-warning rounded mt-4">[ Prossimamente: anteprima recensioni... ]</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
