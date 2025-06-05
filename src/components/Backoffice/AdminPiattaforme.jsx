import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creaPiattaforma, eliminaPiattaforma, fetchPiattaforme, modificaPiattaforma } from "../../redux/actions/giochiActions";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";

const AdminPiattaforme = () => {
  const dispatch = useDispatch();
  const { piattaforme, loading, error } = useSelector((state) => state.piattaforme);

  const [showModal, setShowModal] = useState(false);
  const [editingPiattaforma, setEditingPiattaforma] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    produttore: "",
    annoUscita: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [piattaformaDaEliminare, setPiattaformaDaEliminare] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPiattaforme());
  }, [dispatch]);

  const handleShowModal = (piattaforma = null) => {
    if (piattaforma) {
      setEditingPiattaforma(piattaforma);
      setFormData({
        nome: piattaforma.nome || "",
        produttore: piattaforma.produttore || "",
        annoUscita: piattaforma.annoUscita || "",
      });
    } else {
      setEditingPiattaforma(null);
      setFormData({ nome: "", produttore: "", annoUscita: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      alert("Il nome è obbligatorio.");
      return;
    }

    if (editingPiattaforma) {
      dispatch(modificaPiattaforma(editingPiattaforma.id, formData));
    } else {
      dispatch(creaPiattaforma(formData));
    }

    handleCloseModal();
  };

  const handleDelete = (piattaforma) => {
    setPiattaformaDaEliminare(piattaforma);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (piattaformaDaEliminare) {
      dispatch(eliminaPiattaforma(piattaformaDaEliminare.id));
      setShowConfirmModal(false);
      setPiattaformaDaEliminare(null);
      setSuccessMessage("Piattaforma eliminata con successo!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="container mt-5 admin-retro">
      <h2 className="mb-4">Gestione Piattaforme</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => handleShowModal()}>
        + Aggiungi Nuova Piattaforma
      </Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Produttore</th>
            <th>Anno di Uscita</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {piattaforme.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                Nessuna piattaforma presente
              </td>
            </tr>
          ) : (
            piattaforme.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.produttore || "-"}</td>
                <td>{p.annoUscita || "-"}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(p)}>
                    Modifica
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(p)}>
                    Elimina
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPiattaforma ? "Modifica Piattaforma" : "Aggiungi Piattaforma"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="nome" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="produttore" className="mb-3">
              <Form.Label>Produttore</Form.Label>
              <Form.Control type="text" name="produttore" value={formData.produttore} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="annoUscita" className="mb-3">
              <Form.Label>Anno di Uscita</Form.Label>
              <Form.Control type="number" name="annoUscita" value={formData.annoUscita} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              {editingPiattaforma ? "Salva Modifiche" : "Aggiungi"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare <strong>{piattaformaDaEliminare?.nome}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPiattaforme;
