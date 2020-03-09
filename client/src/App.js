import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import NavigationBarCars from './components/Navbar/Navbar';
import AppRouter from './AppRouter';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <NavigationBarCars />
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
