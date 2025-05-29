import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutteLeRecensioni } from "../../redux/actions/giochiActions";
import { Container, Row, Col, Card, Spinner, Alert, Pagination, Form } from "react-bootstrap";

const RecensioniPage = () => {
  const dispatch = useDispatch();
  const { tutte, loading, error, totalPages } = useSelector((state) => state.recensioni);
  const [currentPage, setCurrentPage] = useState(0);
  const [titoloGioco, setTitoloGioco] = useState("");

  useEffect(() => {
    dispatch(fetchTutteLeRecensioni(currentPage, titoloGioco));
  }, [dispatch, currentPage, titoloGioco]);

  const handleTitoloChange = (e) => {
    setTitoloGioco(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const items = [];
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number + 1}
        </Pagination.Item>
      );
    }
    return <Pagination className="pagination-retro">{items}</Pagination>;
  };

  return (
    <Container className="mt-5 recensioni-container text-center">
      <h2 className="retro-title mb-5">Tutte le Recensioni</h2>

      <Form className="mb-4 d-flex justify-content-center gap-3">
        <Form.Control type="text" placeholder="Cerca per titolo del gioco" value={titoloGioco} onChange={handleTitoloChange} style={{ maxWidth: "300px" }} />
      </Form>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {tutte.length > 0
          ? tutte.map((recensione) => (
              <Col md={6} key={recensione.id} className="mb-4">
                <Card className="retro-game-card recensione-card text-start">
                  <Card.Body>
                    <Card.Title className="retro-font recensione-gioco">{recensione.titoloGioco}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted recensione-utente">
                      <strong className="recensione-utente">Utente:</strong> <span className="nome-utente-evidenziato">{recensione.usernameUtente}</span>
                    </Card.Subtitle>
                    <Card.Text className="recensione-testo">"{recensione.commento}"</Card.Text>
                    <p className="recensione-voto">
                      <strong>Voto:</strong> <span className="retro-voto">{recensione.voto}/10</span>
                    </p>
                    <p className="recensione-data">
                      <strong>Data:</strong>{" "}
                      <span className="data-recensione-evidenziata">{new Date(recensione.dataRecensione).toISOString().slice(0, 10)}</span>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : !loading && <p className="text-center">Nessuna recensione disponibile.</p>}
      </Row>

      {!loading && totalPages > 1 && renderPagination()}
    </Container>
  );
};

export default RecensioniPage;
