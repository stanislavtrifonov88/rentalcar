import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import NavigationBarCars from './components/Navbar/Navbar';
import AppRouter from './AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'mobx-react';
import store from './mobx/store'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <NavigationBarCars />
      <AppRouter />
      <ToastContainer />
    </div>
    </Provider>

  );
}

export default App;
