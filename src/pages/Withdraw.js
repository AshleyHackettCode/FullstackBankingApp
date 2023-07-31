import { useState, useEffect } from 'react';
import { Alert, Button, Card, Form, Col } from 'react-bootstrap';
import { useData } from '../context/DataContext';

export const Withdraw = () => {
  const { balance, setBalance, setWithdrawals, withdrawals } = useData();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!withdrawAmount || isNaN(withdrawAmount) || withdrawAmount < 0) {
      setShowError(true);
      return;
    }
    if (withdrawAmount > balance) {
      setShowError(true);
      return;
    }
    setBalance(balance - Number(withdrawAmount));
    setWithdrawals([...withdrawals, Number(withdrawAmount)]);
    setWithdrawAmount('');
    setShowSuccess(true);
  };

  useEffect(() => {
    let timeout;
    if (showSuccess) {
      timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // 3000 milliseconds (3 seconds)
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showSuccess]);


  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h2>Withdraw</h2>
          <h5>Balance: ${balance.toFixed(2)}</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleWithdraw}>
            <Form.Group>
              <Form.Label htmlFor='number'>Withdraw Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter withdraw amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className='mt-3' 
              variant="primary"
              type="submit" 
              title='Withdraw amount'
              disabled={!withdrawAmount}
            >
              Withdraw
            </Button>
          </Form>
          {showSuccess && (
            <Alert variant="success" className='mt-3'>
              Withdraw successful!
              <Col xs={12} md={4}>
                    <p>Current Balance: ${balance}</p>
              </Col>
            </Alert>
          )}
          {showError && (
            <Alert variant="danger" className='mt-3'>
              Please enter a valid withdraw amount.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};