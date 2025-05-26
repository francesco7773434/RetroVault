import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminaUtente, fetchUtenti } from "../../redux/actions/giochiActions";
import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";

const AdminUtenti = () => {
  const dispatch = useDispatch();
  const { lista, loading, error, deleteSuccess } = useSelector((state) => state.utenti);

  useEffect(() => {
    dispatch(fetchUtenti());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente?")) dispatch(eliminaUtente(id));
  };
  return (
    <Container className="mt-5 admin-retro">
      <h2 className="mb-4">Gestione Utenti</h2>

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
    </Container>
  );
};

export default AdminUtenti;
