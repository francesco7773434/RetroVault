import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiochi } from "../../redux/actions/giochiActions";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

const Catalogo = () => {
  const dispatch = useDispatch();
  const { giochi, loading, error } = useSelector((state) => state.giochi);

  useEffect(() => {
    dispatch(fetchGiochi());
  }, [dispatch]);

  return (
    <Container className="catalogo-container text-center">
      <h2 className="retro-title mb-5">I Nostri Giochi</h2>

      {loading && <Spinner animation="border" variant="warning" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {Array.isArray(giochi) && giochi.length > 0
          ? giochi.map((gioco) => (
              <Col md={4} key={gioco.id} className="mb-4">
                <Card className="retro-game-card text-center">
                  <div className="game-image-container">
                    <Card.Img variant="top" src={gioco.immagine} className="game-image" />
                  </div>
                  <Card.Body>
                    <Card.Title className="retro-font game-title">{gioco.titolo}</Card.Title>
                    <p className="game-rating ">Voto medio: {gioco.votoMedio?.toFixed(1) ?? "N/A"}</p>

                    <Button className="retro-details-btn" href={`/giochi/${gioco.id}`}>
                      Dettagli
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : !loading && <p>Nessun gioco trovato.</p>}
      </Row>
    </Container>
  );
};

export default Catalogo;
