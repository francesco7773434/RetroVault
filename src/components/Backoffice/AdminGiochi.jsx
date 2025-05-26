import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creaGioco, eliminaGioco, fetchGiochi, modificaGioco } from "../../redux/actions/giochiActions";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";

const AdminGiochi = () => {
  const dispatch = useDispatch();
  const { giochi, loading, error } = useSelector((state) => state.giochi);

  const [showModal, setShowModal] = useState(false);
  const [editingGioco, setEditingGioco] = useState(null);
  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    immagine: "",
    annoUscita: "",
    genere: "",
    piattaformaId: "",
  });

  useEffect(() => {
    dispatch(fetchGiochi());
  }, [dispatch]);

  const handleShowModal = (gioco = null) => {
    if (gioco) {
      setEditingGioco(gioco);
      setFormData({
        titolo: gioco?.titolo || "",
        descrizione: gioco?.descrizione || "",
        immagine: gioco?.immagine || "",
        annoUscita: gioco?.annoUscita || "",
        genere: gioco?.genere || "",
        piattaformaId: gioco?.piattaformaId || "",
      });
    } else {
      setEditingGioco(null);
      setFormData({ titolo: "", descrizione: "", piattaforma: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titolo.trim()) {
      alert("Il titolo è obbligatorio");
      return;
    }

    if (editingGioco) {
      dispatch(modificaGioco(editingGioco.id, formData));
    } else {
      dispatch(creaGioco(formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo gioco?")) {
      dispatch(eliminaGioco(id));
    }
  };

  return (
    <div className="container mt-5 admin-retro">
      <h2 className="mb-4">Gestione Giochi</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => handleShowModal()}>
        + Aggiungi Nuovo Gioco
      </Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titolo</th>
            <th>Descrizione</th>
            <th>Piattaforma</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {giochi.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                Nessun gioco presente
              </td>
            </tr>
          )}
          {giochi.map((gioco) => (
            <tr key={gioco.id}>
              <td>{gioco.id}</td>
              <td>{gioco.titolo}</td>
              <td>{gioco.descrizione}</td>
              <td>{gioco.piattaformaNome}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(gioco)}>
                  Modifica
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(gioco.id)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingGioco ? "Modifica Gioco" : "Aggiungi Nuovo Gioco"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="titolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" placeholder="Inserisci titolo" name="titolo" value={formData.titolo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="descrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci descrizione"
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="immagine">
              <Form.Label>Immagine (URL)</Form.Label>
              <Form.Control type="text" name="immagine" value={formData.immagine} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="annoUscita">
              <Form.Label>Anno di Uscita</Form.Label>
              <Form.Control type="number" name="annoUscita" value={formData.annoUscita} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genere">
              <Form.Label>Genere</Form.Label>
              <Form.Control type="text" name="genere" value={formData.genere} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="piattaformaId">
              <Form.Label>Piattaforma ID</Form.Label>
              <Form.Control type="number" name="piattaformaId" value={formData.piattaformaId} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              {editingGioco ? "Salva Modifiche" : "Aggiungi Gioco"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminGiochi;
