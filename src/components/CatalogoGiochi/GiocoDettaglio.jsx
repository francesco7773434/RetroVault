import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { creaRecensione, deleteRecensione, fetchGiocoById, fetchRecensioniByGiocoId } from "../../redux/actions/giochiActions";
import { Container, Row, Col, Card, Spinner, Alert, Button, Form, Modal } from "react-bootstrap";

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
    successDelete,
    errorDelete,
  } = useSelector((state) => state.recensioni);

  const user = useSelector((state) => state.auth.user);

  const [voto, setVoto] = useState("");
  const [commento, setCommento] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recensioneSelezionata, setRecensioneSelezionata] = useState(null);

  useEffect(() => {
    dispatch(fetchGiocoById(id));
    dispatch(fetchRecensioniByGiocoId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successCreate) {
      dispatch(fetchRecensioniByGiocoId(id));
    }
  }, [dispatch, id, successCreate]);

  useEffect(() => {
    if (successCreate) {
      const timer = setTimeout(() => {
        dispatch({ type: "RESET_SUCCESS_CREATE" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(() => {
        dispatch({ type: "RESET_SUCCESS_DELETE" });
      }, 2000);
    }
  }, [dispatch, successDelete]);

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

  const apriModaleConferma = (recensioneId) => {
    setRecensioneSelezionata(recensioneId);
    setShowConfirmModal(true);
  };

  const confermaEliminazione = () => {
    if (recensioneSelezionata) {
      dispatch(deleteRecensione(recensioneSelezionata)).then(() => {
        dispatch(fetchRecensioniByGiocoId(id));
      });
      setShowConfirmModal(false);
      setRecensioneSelezionata(null);
    }
  };

  const annullaEliminazione = () => {
    setShowConfirmModal(false);
    setRecensioneSelezionata(null);
  };

  if (loading) return <Spinner animation="border" variant="warning" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!giocoSingolo) return <p>Gioco non trovato.</p>;

  return (
    <Container className="retro-game-detail text-center">
      <h2 className="retro-title mb-5">{giocoSingolo.titolo}</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="game-image-container-detail">
            <Card.Img src={giocoSingolo.immagine} className="game-image-detail mb-3" />
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
              <br />
              <strong>Data:</strong> {recensione.dataRecensione}
              {user && recensione.utenteId === user.id && (
                <div className="text-end mt-2">
                  <Button variant="danger" size="sm" onClick={() => apriModaleConferma(recensione.id)}>
                    🗑 Elimina la tua recensione
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
        {successDelete && (
          <Alert variant="success" className="mt-3">
            La recensione è stata eliminata con successo!
          </Alert>
        )}
        {errorDelete && (
          <Alert variant="danger" className="mt-3">
            Errore nell'eliminazione della recensione: {errorDelete}
          </Alert>
        )}
      </div>

      <Modal show={showConfirmModal} onHide={annullaEliminazione} centered dialogClassName="retro-modal">
        <Modal.Header closeButton className="retro-modal-header">
          <Modal.Title className="retro-modal-title">🕹 Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="retro-modal-body">
          Sei sicuro di voler eliminare questa recensione? <br />
          <strong className="text-danger">L'azione è irreversibile.</strong>
        </Modal.Body>
        <Modal.Footer className="retro-modal-footer">
          <Button variant="outline-light" className="retro-btn-cancel" onClick={annullaEliminazione}>
            ❌ Annulla
          </Button>
          <Button variant="danger" className="retro-btn-delete" onClick={confermaEliminazione}>
            ✅ Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GiocoDettaglio;
