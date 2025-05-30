import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creaGioco, eliminaGioco, fetchGiochi, modificaGioco } from "../../redux/actions/giochiActions";
import { Alert, Button, Form, Modal, Pagination, Spinner, Table } from "react-bootstrap";

const AdminGiochi = () => {
  const dispatch = useDispatch();
  const { giochi, loading, error, totalPages } = useSelector((state) => state.giochi);

  const [showModal, setShowModal] = useState(false);
  const [editingGioco, setEditingGioco] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [titolo, setTitolo] = useState("");
  const [giocoDaEliminare, setGiocoDaEliminare] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    immagine: "",
    annoUscita: "",
    genere: "",
    piattaformaId: "",
  });

  useEffect(() => {
    const cleanTitolo = titolo.trim();
    dispatch(fetchGiochi(currentPage, 9, cleanTitolo));
  }, [dispatch, currentPage, titolo]);

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

  const handleDelete = (gioco) => {
    setGiocoDaEliminare(gioco);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (giocoDaEliminare) {
      dispatch(eliminaGioco(giocoDaEliminare.id));
      setShowConfirmModal(false);
      setGiocoDaEliminare(null);

      setSuccessMessage("Gioco eliminato con successo!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
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
    <div className="container mt-5 admin-retro">
      <h2 className="mb-4">Gestione Giochi</h2>

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
          {successMessage}
        </Alert>
      )}

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => handleShowModal()}>
        + Aggiungi Nuovo Gioco
      </Button>
      <Form className="my-3 d-flex justify-content-end">
        <Form.Control
          type="text"
          placeholder="Cerca per titolo"
          value={titolo}
          onChange={(e) => {
            setTitolo(e.target.value);
            setCurrentPage(0);
          }}
          style={{ maxWidth: "300px" }}
        />
      </Form>

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
                <Button variant="danger" size="sm" onClick={() => handleDelete(gioco)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!loading && totalPages > 1 && renderPagination()}

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
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare il gioco <strong>{giocoDaEliminare?.titolo}</strong>?
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

export default AdminGiochi;
