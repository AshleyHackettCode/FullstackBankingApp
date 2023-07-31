import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { users, setUsers, createUser } = useData();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setShowErrorMessage(true);
      alert('Please enter a name');
      return;
    }
    if (!email) {
      setShowErrorMessage(true);
      alert('Please enter an email address');
      return;
    }
    if (password.length < 8) {
      setShowErrorMessage(true);
      alert('Password must be at least 8 characters');
      return;
    }

    // Check if the email is already signed up
    const isEmailAlreadySignedUp = !createUser(name, email, password);
    if (isEmailAlreadySignedUp) {
      setShowErrorMessage(true);
      return;
    }

    setShowSuccessMessage(true);
    setShowErrorMessage(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/login');
    }, 4000);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleAddAnotherAccount = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h2>Create Account</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

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

            <Button disabled={!name || !email || !password} className='mt-3' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {showSuccessMessage && (
            <Alert variant="success" className="mt-3">
              Account created successfully!
              <Button onClick={handleAddAnotherAccount} className='ml-3 mt-3 ms-2' variant="secondary">
                Add Another Account
              </Button>
            </Alert>
          )}
          {showErrorMessage && (
            <Alert variant="danger" className="mt-3">
              Error creating account. Email is already signed up.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
