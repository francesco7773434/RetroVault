import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminaUtente, fetchUtenti } from "../../redux/actions/giochiActions";
import { Alert, Button, Container, Form, InputGroup, Modal, Pagination, Spinner, Table } from "react-bootstrap";

const AdminUtenti = () => {
  const dispatch = useDispatch();
  const { lista, loading, error, deleteSuccess, errorDelete, totalPages } = useSelector((state) => state.utenti);

  const [currentPage, setCurrentPage] = useState(0);
  const [utenteDaEliminare, setUtenteDaEliminare] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchUtenti(currentPage, searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, currentPage, searchTerm]);

  useEffect(() => {
    if (deleteSuccess) {
      setDeleteMessage("Utente eliminato con successo!");
      const timer = setTimeout(() => {
        setDeleteMessage("");
        dispatch({ type: "RESET_DELETE_UTENTE" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (utente) => {
    setUtenteDaEliminare(utente);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (utenteDaEliminare) {
      dispatch(eliminaUtente(utenteDaEliminare.id));
      setShowConfirmModal(false);
      setUtenteDaEliminare(null);
    }
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(0);
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
    <Container className="mt-5 admin-retro">
      <h2 className="mb-4">Gestione Utenti</h2>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Cerca per username..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
        />
        <Button variant="secondary" onClick={handleResetSearch} className="ms-2">
          Reset
        </Button>
      </InputGroup>

      {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
      {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Ruolo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                Nessun utente trovato
              </td>
            </tr>
          )}
          {lista.map((utente) => (
            <tr key={utente.id}>
              <td>{utente.id}</td>
              <td>{utente.username}</td>
              <td>{utente.email}</td>
              <td>{utente.roles}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(utente)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!loading && totalPages > 1 && renderPagination()}

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l'utente <strong>{utenteDaEliminare?.username}</strong> con ID <strong>{utenteDaEliminare?.id}</strong>?
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
    </Container>
  );
};

export default AdminUtenti;
