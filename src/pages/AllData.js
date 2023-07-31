import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Card, ListGroup, Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AllData = () => {
  const { users, balance, setUsers, authenticatedUser, logout } = useData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data here if needed
    // This ensures the data is up-to-date whenever the component is mounted or updated
  }, [users, authenticatedUser, balance]);


  const handleDeleteAccount = (userId) => {
    setShowDeleteModal(true);
    setUserToDelete(userId);
  };

  const confirmDeleteAccount = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
    setShowDeleteModal(false);

    // Logout the user after deleting their account
    logout();

    // Navigate to the home page
    navigate('/');
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h2>All Data</h2>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item key={user.id}>
                <Row>
                  <Col xs={12} md={4}>
                    <h5>User: {user.username}</h5>
                  </Col>
                  <Col xs={12} md={4}>
                    <p>Email: {user.email}</p>
                  </Col>
                  <Col xs={12} md={3}>
                    <p>Current Balance: ${user.balance}</p>
                  </Col>
                  {authenticatedUser && authenticatedUser.id === user.id && (
                    <Col xs={12} md={1}>
                      <Button variant="danger" onClick={() => handleDeleteAccount(user.id)}>
                        Delete
                      </Button>
                    </Col>
                  )}
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Delete Account Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this account?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
