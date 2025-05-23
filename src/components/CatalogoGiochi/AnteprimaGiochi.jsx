import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiochi } from "../../redux/actions/giochiActions";
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const AnteprimaGiochi = () => {
  const dispatch = useDispatch();
  const { giochi, loading, error } = useSelector((state) => state.giochi);

  useEffect(() => {
    dispatch(fetchGiochi());
  }, [dispatch]);

  const giochiDaMostrare = giochi.slice(0, 4);

  return (
    <div className="mb-5">
      <h3 className="retro-title text-center">Giochi in Evidenza</h3>
      {loading && <Spinner animation="border" variant="warning" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-4">
        {giochiDaMostrare.map((gioco) => (
          <Col xs={12} sm={6} md={3} key={gioco.id} className="mb-4 d-flex">
            <Card className="retro-game-card text-center w-100">
              <Card.Img variant="top" src={gioco.immagine} className="card-img-top" />
              <Card.Body>
                <Card.Title>{gioco.titolo}</Card.Title>
                <Link to={`/giochi/${gioco.id}`}>
                  <Button variant="warning" size="sm">
                    Dettagli
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AnteprimaGiochi;
