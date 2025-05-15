import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { creaRecensione, fetchGiocoById, fetchRecensioniByGiocoId } from "../../redux/actions/giochiActions";
import { Container, Row, Col, Card, Spinner, Alert, Button, Form } from "react-bootstrap";

const GiocoDettaglio = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { giocoSingolo, loading, error } = useSelector((state) => state.giochi);
  const {
    lista: recensioni,
    loading: loadingRecensioni,
    error: errorRecensioni,
    loadingCreate,
    errorCreate,
    successCreate,
  } = useSelector((state) => state.recensioni);

  const [voto, setVoto] = useState("");
  const [commento, setCommento] = useState("");

  useEffect(() => {
    dispatch(fetchGiocoById(id));
    dispatch(fetchRecensioniByGiocoId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successCreate) {
      dispatch(fetchRecensioniByGiocoId(id));
    }
  }, [dispatch, id, successCreate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      creaRecensione(id, {
        voto: Number(voto),
        commento: commento.trim(),
        giocoId: Number(id),
      })
    );
    setVoto("");
    setCommento("");
  };

  if (loading) return <Spinner animation="border" variant="warning" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!giocoSingolo) return <p>Gioco non trovato.</p>;

  return (
    <Container className="retro-game-detail text-center">
      <h2 className="retro-title mb-5">{giocoSingolo.titolo}</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="game-image-container">
            <Card.Img src={giocoSingolo.immagine} className="game-image mb-3" />
          </div>
        </Col>
        <Col md={6} className="text-start retro-description-box">
          <p>
            <strong className="label-anno">Anno:</strong> {giocoSingolo.annoUscita}
          </p>
          <p>
            <strong className="label-genere">Genere:</strong> {giocoSingolo.genere}
          </p>
          <p>
            <strong className="label-piattaforma">Piattaforma:</strong> {giocoSingolo.piattaformaNome}
          </p>
          <p>
            <strong className="label-voto">Voto Medio:</strong> {giocoSingolo.votoMedio?.toFixed(1) ?? "N/A"}
          </p>
          <p>
            <strong className="label-descrizione">Descrizione:</strong> {giocoSingolo.descrizione}
          </p>
          <Link to="/catalogo">
            <Button className="retro-btn-login mt-4">⬅ Torna al Catalogo</Button>
          </Link>
          <Form onSubmit={handleSubmit} className="mt-4 mb-5 retro-description-box p-3 retro-review-card">
            <h4>Aggiungi una recensione</h4>

            <Form.Group controlId="voto" className="mb-3">
              <Form.Label>Voto (1-10)</Form.Label>
              <Form.Control type="number" min="1" max="10" value={voto} onChange={(e) => setVoto(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="commento" className="mb-3">
              <Form.Label>Commento</Form.Label>
              <Form.Control as="textarea" rows={3} value={commento} onChange={(e) => setCommento(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loadingCreate}>
              {loadingCreate ? "Invio..." : "Invia Recensione"}
            </Button>

            {errorCreate && (
              <Alert variant="danger" className="mt-3">
                {errorCreate}
              </Alert>
            )}
            {successCreate && (
              <Alert variant="success" className="mt-3">
                Recensione inviata con successo!
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
      <div className="mt-5 text-start">
        <h3 className="retro-title">Recensioni</h3>
        {loadingRecensioni && <Spinner animation="border" variant="warning" />}
        {errorRecensioni && <Alert variant="danger">{errorRecensioni}</Alert>}
        {recensioni.length === 0 && !loadingRecensioni ? (
          <p>Nessuna recensione disponibile.</p>
        ) : (
          recensioni.map((recensione) => (
            <Card key={recensione.id} className="mb-3 text-start retro-description-box p-3 retro-review-card">
              <strong className="label-voto">Utente:</strong> {recensione.usernameUtente}
              <br />
              <strong>Voto:</strong> {recensione.voto}
              <br />
              <strong>Commento:</strong> {recensione.commento}
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default GiocoDettaglio;
