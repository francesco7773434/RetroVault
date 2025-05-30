import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiochi } from "../../redux/actions/giochiActions";
import { Container, Row, Col, Card, Button, Spinner, Alert, Pagination, Form } from "react-bootstrap";

const Catalogo = () => {
  const dispatch = useDispatch();
  const { giochi, loading, error, totalPages } = useSelector((state) => state.giochi);
  const [currentPage, setCurrentPage] = useState(0);
  const [titolo, setTitolo] = useState("");

  useEffect(() => {
    const cleanTitolo = titolo.trim();

    dispatch(fetchGiochi(currentPage, 9, cleanTitolo));
  }, [dispatch, currentPage, titolo]);

  const handleTitoloChange = (e) => {
    setTitolo(e.target.value);
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
    return <Pagination className="pagination-retro mt-4">{items}</Pagination>;
  };

  return (
    <Container className="catalogo-container text-center">
      <h2 className="retro-title mb-5 mt-3">I Nostri Giochi</h2>
      <Form className="mb-4 d-flex justify-content-center gap-3">
        <Form.Control type="text" placeholder="Cerca per titolo" value={titolo} onChange={handleTitoloChange} style={{ maxWidth: "300px" }} />
      </Form>

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
      {!loading && totalPages > 1 && renderPagination()}
    </Container>
  );
};

export default Catalogo;
