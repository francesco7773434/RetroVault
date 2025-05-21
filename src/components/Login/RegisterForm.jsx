import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/giochiActions";

import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  if (successMessage) {
    return (
      <Modal show={true} centered backdrop="static" keyboard={false} className="retro-modal">
        <Modal.Header className="retro-modal-header">
          <Modal.Title>🎉 Registrazione Completata</Modal.Title>
        </Modal.Header>
        <Modal.Body className="retro-modal-body text-center">
          <p>{successMessage}. Ora puoi fare il login!</p>
          <Button onClick={() => navigate("/login")} className="retro-btn-login mt-3 w-100">
            🚪 Vai al Login
          </Button>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="retro-form-container">
      <Form onSubmit={handleSubmit} className="retro-form-login p-4">
        <h3 className="retro-title-login">📝 Registrati</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">👤 Username</Form.Label>
          <Form.Control className="retro-input" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">👤 Name</Form.Label>
          <Form.Control className="retro-input" name="nome" value={formData.nome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">👤 Surname</Form.Label>
          <Form.Control className="retro-input" name="cognome" value={formData.cognome} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">📧 Email</Form.Label>
          <Form.Control className="retro-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">🔒 Password</Form.Label>
          <Form.Control className="retro-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" className="retro-btn-login w-100" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "🚀 Registrati"}
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
