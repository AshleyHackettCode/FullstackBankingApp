import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, Form, Button, Alert } from 'react-bootstrap';

export const Deposit = () => {
  const { balance, setBalance, deposits, setDeposits } = useData();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount < 0) {
      setError('Please enter a valid deposit amount');
    } else {
      const newDeposit = { amount: parseFloat(amount) };
      setDeposits([...deposits, newDeposit]);
      setBalance(balance + parseFloat(amount));
      setAmount('');
      setSuccess('Deposit Successful');
    }
  };


  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h2>Deposit Funds</h2>
          <h5>Current Balance: ${balance?.toFixed(2)}</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleDeposit}>
            <Form.Group>
              <Form.Label htmlFor='number'>Deposit Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter deposit amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              className='mt-3'
              type="submit"
              title='Deposit amount'
              disabled={!amount}
            >
              Deposit
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};