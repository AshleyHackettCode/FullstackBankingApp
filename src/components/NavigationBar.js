import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useData } from '../context/DataContext';

export const NavigationBar = () => {
  const location = useLocation();
  const { authenticatedUser, logout } = useData();

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="/">WizeBank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link
            as={Link}
            to="/"
            active={location.pathname === '/'}
            title="View the home page"
          >
            Home
          </Nav.Link>
          {authenticatedUser ? ( // Show the navigation links for authenticated users
            <>
              <Nav.Link
                as={Link}
                to="/deposit"
                active={location.pathname === '/deposit'}
                title="Deposit from your account"
              >
                Deposit
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/withdraw"
                active={location.pathname === '/withdraw'}
                title="Withdraw from your account"
              >
                Withdraw
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/alldata"
                active={location.pathname === '/alldata'}
                title="View all data activity from accounts"
              >
                All Data
              </Nav.Link>
              <Button variant="outline-primary" onClick={logout}>
                Logout
              </Button>
            </>
          ) : ( // Show the create account and login links for non-authenticated users
            <>
              <Nav.Link
                as={Link}
                to="/createaccount"
                active={location.pathname === '/createaccount'}
                title="Create a new bank account"
              >
                Create Account
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                active={location.pathname === '/login'}
                title="Login to your account"
              >
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
