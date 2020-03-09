import React from 'react';
import { Route } from 'react-router-dom';
import AvailableCarsContainer from './components/AvailableCars/AvailableCarsContainer';
import Dashboard from './components/Dashboard/Dashboard';
import CheckoutPage from './components/Checkout/CheckoutPage';


const AppRouter = () => (
  <div className="routingContainer">
    <Route path="/home" component={AvailableCarsContainer} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/cars/:id" component={CheckoutPage} />
  </div>
);

export default AppRouter;
