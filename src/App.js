import React from "react";
import { DataContextProvider } from "./context/DataContext";
import { Routes, Route } from 'react-router-dom';
import { NavigationBar } from "./components/NavigationBar";
import { Home } from "./pages/Home";
import { AllData } from "./pages/AllData";
import { CreateAccount } from "./pages/CreateAccount";
import { Deposit } from "./pages/Deposit";
import { Withdraw } from "./pages/Withdraw";
import { Login } from "./pages/Login";

function App() {
  return (
    <DataContextProvider>
      <>
        <NavigationBar />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route exact path='/alldata' element={<AllData />} />
          <Route exact path='/createaccount' element={<CreateAccount />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/deposit' element={<Deposit />} />
          <Route exact path='/withdraw' element={<Withdraw />} />
        </Routes>
      </>
    </DataContextProvider>
  );
}

export default App;