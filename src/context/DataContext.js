import { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [balance, setBalance] = useState(100);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const createUser = (username, email, password) => {
    // Check if the email already exists in the users array
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return false; // Return false if the email is already signed up
    }

    const newUser = { username, email, password, balance: 100 };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    return true; // Return true if the user is successfully created
  };

  const deposit = (username, amount) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === username) {
          return { ...user, balance: user.balance + amount };
        }
        return user;
      })
    );
  };

  const withdraw = (username, amount) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === username) {
          const newBalance = user.balance - amount;
          return { ...user, balance: newBalance < 0 ? 0 : newBalance };
        }
        return user;
      })
    );
  };

  const login = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setAuthenticatedUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthenticatedUser(null);
  };

  const value = {
    balance,
    setBalance,
    deposits,
    setDeposits,
    withdrawals,
    setWithdrawals,
    users,
    setUsers,
    authenticatedUser,
    createUser,
    deposit,
    withdraw,
    login,
    logout,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
