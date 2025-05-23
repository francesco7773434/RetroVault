import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutteLeRecensioni } from "../../redux/actions/giochiActions";
import { Alert, Card, Col, Row, Spinner } from "react-bootstrap";

const AnteprimaRecensioni = () => {
  const dispatch = useDispatch();
  const { tutte: recensioni, loading, error } = useSelector((state) => state.recensioni);

  useEffect(() => {
    dispatch(fetchTutteLeRecensioni());
  }, [dispatch]);

  const recensioniDaMostrare = (recensioni ?? []).slice(0, 4);

  return (
    <div>
      <h3 className="retro-title text-center">Ultime Recensioni</h3>
      {loading && <Spinner animation="border" variant="warning" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-4">
        {recensioniDaMostrare.map((recensione) => (
          <Col md={6} key={recensione.id} className="mb-3">
            <Card className="retro-review-card">
              <Card.Body>
                <Card.Title>{recensione.titoloGioco}</Card.Title>
                <Card.Text>"{recensione.commento}"</Card.Text>
                <Card.Subtitle>
                  Voto: {recensione.voto} - {recensione.usernameUtente}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AnteprimaRecensioni;
