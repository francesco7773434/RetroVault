import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutteLeRecensioni } from "../../redux/actions/giochiActions";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const AnteprimaRecensioni = () => {
  const dispatch = useDispatch();
  const { tutte: recensioni, loading, error } = useSelector((state) => state.recensioni);

  useEffect(() => {
    dispatch(fetchTutteLeRecensioni());
  }, [dispatch]);

  const recensioniDaMostrare = (recensioni ?? []).slice(0, 4);

  return (
    <div className="mt-4">
      <h3 className="retro-title text-center mb-4">Ultime Recensioni</h3>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {recensioniDaMostrare.length > 0
          ? recensioniDaMostrare.map((recensione) => (
              <Col md={6} key={recensione.id} className="mb-4 d-flex">
                <Card className="retro-game-card recensione-card text-start w-100">
                  <Card.Body>
                    <Card.Title className="retro-font recensione-gioco">{recensione.titoloGioco}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted recensione-utente">
                      <strong className="recensione-utente">Utente:</strong> <span className="nome-utente-evidenziato">{recensione.usernameUtente}</span>
                    </Card.Subtitle>
                    <Card.Text className="recensione-testo">"{recensione.commento}"</Card.Text>
                    <p className="recensione-voto">
                      <strong>Voto:</strong> <span className="retro-voto">{recensione.voto}/10</span>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : !loading && <p className="text-center">Nessuna recensione disponibile.</p>}
      </Row>
    </div>
  );
};

export default AnteprimaRecensioni;
