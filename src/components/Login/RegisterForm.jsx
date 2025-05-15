import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/giochiActions";

import { Alert, Button, Form, Spinner } from "react-bootstrap";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
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
          <Form.Control className="retro-input" name="ame" value={formData.nome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">👤 Surname</Form.Label>
          <Form.Control className="retro-input" name="surname" value={formData.cognome} onChange={handleChange} required />
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
