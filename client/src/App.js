import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import NavigationBarCars from './components/Navbar/Navbar';
import AppRouter from './AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'mobx-react';
import availableCarStore from './mobx/availableCarStore';
import dashboardStore from './mobx/dashboardStore';
import customerStore from './mobx/customerStore';
import individualCarStore from './mobx/individualCarStore';

function App() {
  return (
    <Provider 
    availableCarStore={availableCarStore}
    dashboardStore={dashboardStore}
    customerStore={customerStore}
    individualCarStore={individualCarStore}
    >
    <div className="App">
      <NavigationBarCars />
      <AppRouter />
      <ToastContainer />
    </div>
    </Provider>

  );
}

export default App;
