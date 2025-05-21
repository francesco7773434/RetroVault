import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile, resetUserUpdateSuccess } from "../../redux/actions/giochiActions";
import { Container, Row, Col, Button, Spinner, Alert, Modal, Form, Image } from "react-bootstrap";

const ProfiloUtente = () => {
  const dispatch = useDispatch();
  const { user, loading, error, updateSuccess } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nome: "",
    cognome: "",
    avatar: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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

  useEffect(() => {
    if (updateSuccess && justSubmitted) {
      const timer = setTimeout(() => {
        dispatch(resetUserUpdateSuccess());
        setJustSubmitted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, justSubmitted, dispatch]);

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

  if (loading && !user) return <Spinner animation="border" variant="warning" />;

  return (
    <Container className="mt-5">
      <h2>Profilo Utente</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {updateSuccess && justSubmitted && <Alert variant="success">Profilo aggiornato con successo!</Alert>}

      {user && (
        <>
          <Row className="mt-4">
            <Col md={4}>{user.avatar && <Image src={user.avatar} roundedCircle fluid style={{ width: "150px", height: "150px", objectFit: "cover" }} />}</Col>
            <Col md={8}>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Nome:</strong> {user.nome}
              </p>
              <p>
                <strong>Cognome:</strong> {user.cognome}
              </p>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                ✏️ Modifica Profilo
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Modale modifica profilo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="cognome" value={formData.cognome || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Avatar (URL immagine)</Form.Label>
              <Form.Control type="text" name="avatar" value={formData.avatar || ""} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button type="submit" variant="success">
              Salva Modifiche
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProfiloUtente;
