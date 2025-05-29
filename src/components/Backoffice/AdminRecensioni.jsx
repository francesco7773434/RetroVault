import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aggiornaRecensione, deleteRecensione, fetchTutteLeRecensioni } from "../../redux/actions/giochiActions";
import { Alert, Button, Form, Modal, Spinner, Table, Pagination } from "react-bootstrap";

const AdminRecensioni = () => {
  const dispatch = useDispatch();
  const { tutte, loading, error, successDelete, totalPages } = useSelector((state) => state.recensioni);

  const [selectedRecensione, setSelectedRecensione] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titoloGioco, setTitoloGioco] = useState("");

  const [formData, setFormData] = useState({
    commento: "",
    voto: 0,
    giocoId: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchTutteLeRecensioni(currentPage, titoloGioco));
  }, [dispatch, currentPage, titoloGioco, successDelete]);

  const handleTitoloChange = (e) => {
    setTitoloGioco(e.target.value);
    setCurrentPage(0);
  };
  const handleOpenModal = (recensione) => {
    setSelectedRecensione(recensione);
    setFormData({
      commento: recensione.commento || "",
      voto: recensione.voto || 0,
      giocoId: recensione.giocoId || 0,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRecensione(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRecensione) {
      dispatch(aggiornaRecensione(selectedRecensione.id, formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa recensione?")) {
      dispatch(deleteRecensione(id));
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
    return <Pagination className="pagination-retro justify-content-center mt-3">{items}</Pagination>;
  };

  return (
    <div className="container mt-5 admin-retro">
      <h2 className="mb-4">Gestione Recensioni</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="mb-4 d-flex justify-content-center gap-3">
        <Form.Control type="text" placeholder="Cerca per titolo del gioco" value={titoloGioco} onChange={handleTitoloChange} style={{ maxWidth: "300px" }} />
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Voto</th>
            <th>Commento</th>
            <th>Username</th>
            <th>Titolo Gioco</th>
            <th>Gioco ID</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {tutte.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Nessuna recensione trovata
              </td>
            </tr>
          ) : (
            tutte.map((recensione) => (
              <tr key={recensione.id}>
                <td>{recensione.id}</td>
                <td>{recensione.voto}</td>
                <td>{recensione.commento}</td>
                <td>{recensione.usernameUtente}</td>
                <td>{recensione.titoloGioco}</td>
                <td>{recensione.giocoId || recensione.gioco?.id || "?"}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenModal(recensione)}>
                    Modifica
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(recensione.id)}>
                    Elimina
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {!loading && totalPages > 1 && renderPagination()}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Recensione</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Commento</Form.Label>
              <Form.Control as="textarea" rows={3} name="commento" value={formData.commento} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Voto</Form.Label>
              <Form.Control type="number" min="0" max="10" name="voto" value={formData.voto} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gioco ID</Form.Label>
              <Form.Control type="number" name="giocoId" value={formData.giocoId} onChange={handleChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              Salva Modifiche
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminRecensioni;
