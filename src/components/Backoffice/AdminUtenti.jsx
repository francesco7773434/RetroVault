import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminaUtente, fetchUtenti } from "../../redux/actions/giochiActions";
import { Alert, Button, Container, Pagination, Spinner, Table } from "react-bootstrap";

const AdminUtenti = () => {
  const dispatch = useDispatch();
  const { lista, loading, error, deleteSuccess, errorDelete, totalPages } = useSelector((state) => state.utenti);
  const [currentPage, setCurrentPage] = useState(0);

  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUtenti(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

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

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente?")) dispatch(eliminaUtente(id));
  };
  return (
    <Container className="mt-5 admin-retro">
      <h2 className="mb-4">Gestione Utenti</h2>
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
                <Button variant="danger" size="sm" onClick={() => handleDelete(utente.id)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!loading && totalPages > 1 && renderPagination()}
    </Container>
  );
};

export default AdminUtenti;
