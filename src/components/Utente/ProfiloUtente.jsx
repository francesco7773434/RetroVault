import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecensione, fetchRecensioniByUser, fetchUserProfile, updateUserProfile } from "../../redux/actions/giochiActions";
import { Navigate } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Image, Modal, Row, Spinner } from "react-bootstrap";

const ProfiloUtente = () => {
  const dispatch = useDispatch();
  const { user, loading, error, updateSuccess } = useSelector((state) => state.auth);
  const { recensioniUtente, loading: recensioniLoading, error: recensioniError, successDelete, errorDelete } = useSelector((state) => state.recensioni);

  const [showModal, setShowModal] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recensioneSelezionata, setRecensioneSelezionata] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nome: "",
    cognome: "",
    avatar: "",
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchRecensioniByUser(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        nome: user.nome || "",
        cognome: user.cognome || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setShowModal(false);
    setJustSubmitted(true);
  };

  const apriModaleConferma = (recensioneId) => {
    setRecensioneSelezionata(recensioneId);
    setShowConfirmModal(true);
  };

  const confermaEliminazione = () => {
    if (recensioneSelezionata) {
      dispatch(deleteRecensione(recensioneSelezionata)).then(() => {
        dispatch(fetchRecensioniByUser(user.id));
        setDeleteMessage("Recensione eliminata con successo!");
        setTimeout(() => setDeleteMessage(""), 3000);
      });
      setShowConfirmModal(false);
      setRecensioneSelezionata(null);
    }
  };

  const annullaEliminazione = () => {
    setShowConfirmModal(false);
    setRecensioneSelezionata(null);
  };

  useEffect(() => {
    if (successDelete || errorDelete) {
      const timer = setTimeout(() => {
        dispatch({ type: "RESET_SUCCESS_DELETE" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, successDelete, errorDelete]);

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (loading && !user) return <Spinner animation="border" variant="warning" />;

  return (
    <Container className="mt-5 retro-description-box p-4 text-start">
      <h2 className="retro-title mb-4">👤 Profilo Utente</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {updateSuccess && justSubmitted && <Alert variant="success">Profilo aggiornato con successo!</Alert>}

      {user && (
        <Row>
          <Col md={4} className="text-center mb-3">
            {user.avatar && (
              <Image
                src={user.avatar}
                roundedCircle
                fluid
                className="mb-3 retro-avatar"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  border: "3px solid #ffcc00",
                }}
              />
            )}
          </Col>
          <Col md={8}>
            <p>
              <strong>🧾 Username:</strong> {user.username}
            </p>
            <p>
              <strong>📧 Email:</strong> {user.email}
            </p>
            <p>
              <strong>📛 Nome:</strong> {user.nome}
            </p>
            <p>
              <strong>👤 Cognome:</strong> {user.cognome}
            </p>
            <Button className="retro-btn-login mt-3" onClick={() => setShowModal(true)}>
              ✏️ Modifica Profilo
            </Button>
          </Col>
        </Row>
      )}

      <h3 className="mt-5">📝 Le tue recensioni:</h3>
      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
      {errorDelete && <Alert variant="danger">Errore nell'eliminazione della recensione: {errorDelete}</Alert>}
      {recensioniLoading ? (
        <Spinner animation="border" variant="info" />
      ) : recensioniError ? (
        <Alert variant="danger">{recensioniError}</Alert>
      ) : recensioniUtente.length === 0 ? (
        <p>Non hai ancora scritto recensioni.</p>
      ) : (
        <Row>
          {recensioniUtente.map((recensione) => (
            <Col key={recensione.id} md={6} className="mb-3">
              <div className="retro-recensione-card">
                <h5 className="retro-recensione-title">{recensione.titoloGioco}</h5>
                <h5 className="retro-recensione-subtitle">{recensione.titolo}</h5>
                <p>{recensione.commento}</p>
                <p>
                  <strong>Voto:</strong> {recensione.voto}
                </p>
                <div className="text-end">
                  <Button variant="danger" size="sm" onClick={() => apriModaleConferma(recensione.id)}>
                    🗑 Elimina
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-warning">
          <Modal.Title>✏️ Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="bg-black text-light">
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome || ""} onChange={handleChange} className="retro-input" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="cognome" value={formData.cognome || ""} onChange={handleChange} className="retro-input" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Avatar (URL immagine)</Form.Label>
              <Form.Control type="text" name="avatar" value={formData.avatar || ""} onChange={handleChange} className="retro-input" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              ❌ Annulla
            </Button>
            <Button type="submit" variant="success">
              💾 Salva Modifiche
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

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

export default ProfiloUtente;
