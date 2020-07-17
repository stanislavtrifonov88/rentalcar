import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import NavigationBarCars from './components/Navbar/Navbar';
import AppRouter from './AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'mobx-react';
import availableCarStore from './mobx/availableCarStore.tsx';
import dashboardStore from './mobx/dashboardStore.ts';
import customerStore from './mobx/customerStore.tsx';
import individualCarStore from './mobx/individualCarStore.ts';
import checkoutFormStore from './mobx/checkoutFormStore.tsx';

function App() {
  return (
    <Provider 
    availableCarStore={availableCarStore}
    dashboardStore={dashboardStore}
    customerStore={customerStore}
    individualCarStore={individualCarStore}
    checkoutFormStore={checkoutFormStore}
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
