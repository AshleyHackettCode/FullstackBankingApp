import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { login } = useData();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setShowErrorMessage(true);
      return;
    }
    if (!password) {
      setShowErrorMessage(true);
      return;
    }

    const isLoggedIn = login(email, password);

    if (isLoggedIn) {
      setShowErrorMessage(false);
      setShowWelcomeMessage(true);

      setTimeout(() => {
        setShowWelcomeMessage(false);
        navigate('/');
      }, 3000);

      setEmail('');
      setPassword('');
    } else {
      setShowErrorMessage(true);
    }
  };


  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h2>Login</h2>
        </Card.Header>
        <Card.Body>
          {showWelcomeMessage && (
            <Alert variant="success" className="text-center">
              Welcome! Logging you in...
            </Alert>
          )}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Login
            </Button>
          </Form>
          {showErrorMessage && (
            <Alert variant="danger" className="mt-3">
              Invalid email or password.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
