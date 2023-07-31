import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bankImage from '../assets/bank.jpg';
import { useData } from '../context/DataContext';

export const Home = () => {
  const { authenticatedUser } = useData();

  return (
    <div
      style={{
        backgroundImage: `url(${bankImage})`,
        backgroundSize: 'contain',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '400px' }}>
        <Card
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          }}
        >
          <Card.Title style={{ fontSize: '3rem', marginBottom: '20px' }}>
            {authenticatedUser ? `Welcome, ${authenticatedUser.username}!` : 'Welcome to WizeBank'}
          </Card.Title>
          <Card.Text style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            Welcome to WizeBank, where all your financial dreams can come true! Click the button below to get started.
          </Card.Text>
          {authenticatedUser ? ( // If the user is authenticated, the button takes them to the All Data page
            <Link to="/alldata">
              <Button variant="primary" size="lg" block>
                Get Started
              </Button>
            </Link>
          ) : ( // If the user is not authenticated, the button takes them to the Create Account page
            <Link to="/createaccount">
              <Button variant="primary" size="lg" block>
                Get Started
              </Button>
            </Link>
          )}
        </Card>
      </div>
    </div>
  );
};
