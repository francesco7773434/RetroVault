import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Backoffice = () => {
  return (
    <Container className="mt-5 text-center">
      <h2 className="retro-title mb-4">🎮 Pannello di Amministrazione</h2>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="retro-admin-card">
            <Card.Body>
              <Card.Title className="retro-font">📚 Giochi</Card.Title>
              <Card.Text>Gestisci i giochi: crea, modifica, elimina</Card.Text>
              <Link to="/admin/giochi">
                <Button className="retro-btn-login">Gestione Giochi</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="retro-admin-card">
            <Card.Body>
              <Card.Title className="retro-font">📝 Recensioni</Card.Title>
              <Card.Text>Modera le recensioni pubblicate dagli utenti</Card.Text>
              <Link to="/admin/recensioni">
                <Button className="retro-btn-login">Gestione Recensioni</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="retro-admin-card">
            <Card.Body>
              <Card.Title className="retro-font">👥 Utenti</Card.Title>
              <Card.Text>Gestisci gli utenti registrati alla piattaforma</Card.Text>
              <Link to="/admin/utenti">
                <Button className="retro-btn-login">Gestione Utenti</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="retro-admin-card">
            <Card.Body>
              <Card.Title className="retro-font">🕹️ Piattaforme</Card.Title>
              <Card.Text>Aggiungi o modifica le piattaforme disponibili</Card.Text>
              <Link to="/admin/piattaforme">
                <Button className="retro-btn-login">Gestione Piattaforme</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Backoffice;
