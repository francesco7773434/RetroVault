import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/giochiActions";

import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
  return (
    <div className="retro-login-wrapper">
      <Form onSubmit={handleSubmit} className="retro-form-login">
        <h3 className="retro-title-login">🕹 Login</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">👤 Username</Form.Label>
          <Form.Control className="retro-input" type="text" name="username" value={credentials.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4 text-start">
          <Form.Label className="retro-label">🔒 Password</Form.Label>
          <Form.Control className="retro-input" type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" className="retro-btn-login w-100 mb-3" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "🚀 Accedi"}
        </Button>

        <Link to="/register">
          <Button variant="outline-info" className="retro-btn-register w-100">
            📝 Registrati
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default LoginForm;
